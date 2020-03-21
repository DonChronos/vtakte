import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header/';

const Home = React.lazy(() => import('../Home'));

const SignUp = React.lazy(() => import('../SignUp'));
const SignIn = React.lazy(() => import('../SignIn'));

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