import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// Style the wrapping component, wrap Links in ul li's, style them too.

// add indication that user is logged in
const Home = props => {
    return props.user ? <h1>Welcome, {props.user}</h1> : 
	<div>
  <h1>Vtakte - a social networking service for musicians</h1>
  <Link to='/signup'>Sign Up</Link>
  <Link to='/signin'>Sign In</Link>
</div>;
}
export default Home;