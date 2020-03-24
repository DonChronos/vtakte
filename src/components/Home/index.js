import React from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// Style the wrapping component, wrap Links in ul li's, style them too.

const Home = props => {
    return props.name ? 
	<div>
	  <h1>Welcome, {props.name}</h1>
	  <Link to='/create_band'>Create band</Link>
    </div>	
	: 
	<div>
  <h1>Vtakte - a social networking service for musicians</h1>
  <p>You need to be signed in to explore the website</p>
  <Link to='/signup'>Sign Up</Link>
  <Link to='/signin'>Sign In</Link>
</div>;
}
export default Home;