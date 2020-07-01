import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';
import { auth, userRef } from '../Firebase';

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;
  gap: 1px 1px;
  grid-template-areas: "Header Header Header" ". Content ." ". Footer .";
  min-height: 100vh;
  main {
	  grid-area: Content;
	  border: 1px solid gray;
	  border-radius: 2px;
	  text-align: center;
  };
  footer {
	  grid-area: Footer;
	  margin: auto;
  }
`
const Home = React.lazy(() => import('../Home'));
const SignUp = React.lazy(() => import('../SignUp'));
const SignIn = React.lazy(() => import('../SignIn'));
const User = React.lazy(() => import('../User'));
const Users = React.lazy(() => import('../Users'));
const Band = React.lazy(() => import('../Band'));
const Bands = React.lazy(() => import('../Bands'));
const Chat = React.lazy(() => import('../Chat'));
const Chats = React.lazy(() => import('../Chats'));
const Create_Band = React.lazy(() => import('../Create_Band'));


let localObject = JSON.parse(localStorage.getItem(Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]));
// get firebase localstorage object
let user = localObject ? {
	name: localObject.displayName, 
	uid: localObject.uid, 
	role: localObject.photoURL} : {
			   name: null, 
			   uid: null, 
			   role: null
			   };
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
// if solution doesn't present itself soon, on auth setstate with json.parse

/// change state from [] to {} <--forgot why I wrote that
// minimise database
// update profile in useeffect
const App = () => {
	let [state, setState] = useState({...user});
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(authUser => {
		if (authUser) {
			setState({
				name: authUser.displayName, 
				uid: authUser.uid, 
				role: authUser.photoURL
				});
		} else {
		   setState({
			   name: null, 
			   uid: null, 
			   role: null
			   });
		}
	});
	return () => unsubscribe();
	}, []);
	let { name, uid, role } = state;
  return (
  <Grid>
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
			<ProtectedRoute exact check={name} path='/chats'>
			  <Chats name={name} uid={uid} />
			</ProtectedRoute>
			<ProtectedRoute exact check={name} path='/chats/:uid'>
			  <Chat name={name} uid={uid} role={role} />
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
	<Footer />
  </Grid>
  );
};
export default App;