import React, { Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../Header';
import { auth } from '../Firebase';

const Home = React.lazy(() => import('../Home'));
const Users = React.lazy(() => import('../Users'));
const SignUp = React.lazy(() => import('../SignUp'));
const SignIn = React.lazy(() => import('../SignIn'));

let localObject = JSON.parse(localStorage.getItem(Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]));
// get firebase localstorage object
let user = localObject ? localObject.displayName : null;

const App = () => {
	let [test, setTest] = useState(user);
	auth.onAuthStateChanged(authUser => {
		console.log('auth state changed');
		if (authUser) {
			console.log('user auth');
			setTest(authUser.displayName);
		} else {
			console.log('user unauth');
		   setTest(null);
		}
	});
  return (
  <BrowserRouter>
    <Header user={test}/>
    <main>
	    <Suspense fallback={<h3>Loading...</h3>}>
		  <Switch>
		    <Route exact path='/'>
			  <Home user={test} />
			</Route>
			<Route exact path='/users'>
			  <Users />
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