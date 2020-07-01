import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SignLink = styled(Link)`
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
	  <SignLink to='/create_band'>Create band</SignLink>
    </div>
	:
	<div>
  <h1>Vtakte - a social networking service for musicians</h1>
  <p>You need to be signed in to explore the website</p>
  <SignLink to='/signup'>Sign Up</SignLink>
  <SignLink to='/signin'>Sign In</SignLink>
</div>;
}
export default Home;
