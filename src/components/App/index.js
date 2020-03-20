import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/';

const Home = React.lazy(() => import('./components/Home'));
const Groups = React.lazy(() => import('./components/Groups'));
const Group = React.lazy(() => import('./components/Group'));
const Users = React.lazy(() => import('./components/Users'));
const User = React.lazy(() => import('./components/User'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const SignIn = React.lazy(() => import('./components/SignIn'));
const Messages = React.lazy(() => import('./components/Messages'));

const App = () => {
	// useEffect authorisation should be here
	
  return (
  <BrowserRouter>
    <Header/>
    <main>
	    <Suspense fallback={<h3>Loading...</h3>}>
		  <Switch>
		    <Route exact path='/'>
			  <Home />
			</Route>
			<Route exact path='/groups'>
			  <Groups />
			</Route>
			<Route exact path='/groups/:id'>
			  <Group />
			</Route>
			<Route exact path='/users'>
			  <Users />
			</Route>
			<Route exact path='/users/:id'>
			  <User />
			</Route>
			<Route exact path='/signup'>
			  <SignUp />
			</Route>
			<Route exact path='/signin'>
			  <SignIn />
			</Route>
			<Route exact path='/messages'>
			  {loggedIn ? <Messages /> : <Redirect to='/signin'>}
			</Route>
		  </Switch>
		</Suspense>
	</main>
  </BrowserRouter>
  );
};
export default App;