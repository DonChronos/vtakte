import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sign_Link = styled(Link)`
background-color: #5b88bd;
border-radius: 5px;
color: white;
text-decoration: none;
padding: 10px;
`

const Home = props => {
	console.log(props);
    return props.name ? 
	<div>
	  <h1>Welcome, {props.name}</h1>
	  <Sign_Link to='/create_band'>Create band</Sign_Link>
    </div>	
	: 
	<div>
  <h1>Vtakte - a social networking service for musicians</h1>
  <p>You need to be signed in to explore the website</p>
  <Sign_Link to='/signup'>Sign Up</Sign_Link>
  <Sign_Link to='/signin'>Sign In</Sign_Link>
</div>;
}
export default Home;