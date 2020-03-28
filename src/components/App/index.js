import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../Header';
import { auth } from '../Firebase';

const Home = React.lazy(() => import('../Home'));
const SignUp = React.lazy(() => import('../SignUp'));
const SignIn = React.lazy(() => import('../SignIn'));
const User = React.lazy(() => import('../User'));
const Users = React.lazy(() => import('../Users'));
const Band = React.lazy(() => import('../Band'));
const Bands = React.lazy(() => import('../Bands'));
const Create_Band = React.lazy(() => import('../Create_Band'));

let localObject = JSON.parse(localStorage.getItem(Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]));
// get firebase localstorage object
let user = localObject ? [localObject.displayName, localObject.uid, localObject.photoURL] : 
[null, null, null];

const ProtectedRoute = ({ check, children, ...rest}) => {
	return (
	<Route 
	  {...rest}
	  render={({ location }) => 
	    check ? (
		children
		) : (
		  <Redirect
		    to='/'
			/>
		)
	  }
	/>
	);
};

/// change state from [] to {} <--forgot why I wrote that
// minimise database
const App = () => {
	let [state, setState] = useState(user);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
		console.log('auth state changed');
		if (authUser) {
			console.log('user auth');
			setState([authUser.displayName, authUser.uid, authUser.photoURL]);
		} else {
		   console.log('user unauth');
		   setState([null, null, null]);
		}
		console.log('useEffect');
	});
	return () => unsubscribe();
	}, []);
	console.log('app');
	let [name, uid, photo] = state;
  return (
  <BrowserRouter>
    <Header name={name} />
    <main>
	    <Suspense fallback={<h3>Loading...</h3>}>
		  <Switch>
		    <Route exact path='/'>
			  <Home name={name} />
			</Route>
			<ProtectedRoute exact check={name} path='/create_band'>
			  <Create_Band name={name} uid={uid} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/users'>
			  <Users />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/bands'>
			  <Bands />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/users/:uid'>
			  <User uid={uid} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/bands/:uid'>
			  <Band name={name} uid={uid} />
			</ProtectedRoute>
			<ProtectedRoute exact check={!name} path='/signup'>
			  <SignUp />
			</ProtectedRoute>
			<ProtectedRoute exact check={!name} path='/signin'>
			  <SignIn />
			</ProtectedRoute>
		  </Switch>
		</Suspense>
	</main>
  </BrowserRouter>
  );
};
export default App;