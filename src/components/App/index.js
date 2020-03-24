import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../Header';
import { auth, usersRef, bandsRef, userRef, bandRef } from '../Firebase';

const Home = React.lazy(() => import('../Home'));
const List = React.lazy(() => import('../List'));
const SignUp = React.lazy(() => import('../SignUp'));
const SignIn = React.lazy(() => import('../SignIn'));
const Profile = React.lazy(() => import('../Profile'));
const Create_Band = React.lazy(() => import('../Create_Band'));

let localObject = JSON.parse(localStorage.getItem(Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]));
// get firebase localstorage object
let user = localObject ? [localObject.displayName, localObject.uid] : [null, null];

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
const App = () => {
	let [state, setState] = useState(user);
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
		console.log('auth state changed');
		if (authUser) {
			console.log('user auth');
			setState([authUser.displayName, authUser.uid]);
		} else {
		   console.log('user unauth');
		   setState([null, null]);
		}
		console.log('useEffect');
	});
	return () => unsubscribe();
	}, []);
	console.log('app');
	let [name, uid] = state;
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
			  <Create_Band uid={uid} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/users'>
			  <List type='users' observer={usersRef} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/bands'>
			  <List type='bands' observer={bandsRef} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/users/:uid'>
			  <Profile uid={uid} observer={userRef} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/bands/:uid'>
			  <Profile uid={uid} observer={bandRef} />
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