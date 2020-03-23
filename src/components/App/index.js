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

// protected route implementation here 
// signin and signup should be protected if user is already signed in
/// change state from [] to {}
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
			<Route exact path='/create_band'>
			  <Create_Band uid={uid} />
			</Route>
			<Route exact path='/users'>
			  <List type='users' observer={usersRef} />
			</Route>
			<Route exact path='/bands'>
			  <List type='bands' observer={bandsRef} />
			</Route>
			<Route exact path='/users/:uid'>
			  <Profile uid={uid} observer={userRef} />
			</Route>
			<Route exact path='/bands/:uid'>
			  <Profile uid={uid} observer={bandRef} />
			</Route>
			<Route exact path='/signup'>
			  <SignUp />
			</Route>
			<Route exact path='/signin'>
			  <SignIn />
			</Route>
		  </Switch>
		</Suspense>
	</main>
  </BrowserRouter>
  );
};
export default App;