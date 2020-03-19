import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/';

const Home = React.lazy(() => import('./components/Home'));
const Groups = React.lazy(() => import('./components/Groups'));
const Group = React.lazy(() => import('./components/Group'));
const Users = React.lazy(() => import('./components/Users'));
const User = React.lazy(() => import('./components/User'));
const SignUp = React.lazy(() => import('./components/SignUp'));
const SignIn = React.lazy(() => import('./components/SignIn'));
const Messages = React.lazy(() => import('./components/Messages'));
// For messages, if unauthorized, show error modal and after 5 seconds
// redirect to SignIn page.

const App = () => {
	// useEffect authorisation should be here
	
  return (
  <BrowserRouter>
    <Header/>
    <main>
	    <Suspense fallback={<h3>Loading...</h3>}>
		  <Switch>
		    <Route exact path='/' component={Home} />
			<Route exact path='/groups' component={Groups} />
			<Route exact path='/groups/:id' component={Group} />
			<Route exact path='/users' component={Users} />
			<Route exact path='/users/:id' component={User} />
			<Route exact path='/signup' component={SignUp} />
			<Route exact path='/signin' component={SignIn} />
			<Route exact path='/messages' component={Messages} />
		  </Switch>
		</Suspense>
	</main>
  </BrowserRouter>
  );
};
export default App;