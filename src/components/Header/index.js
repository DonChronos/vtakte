import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import styled from 'styled-components';
import SignOut from '../SignOut';

// make header more mobile friendly
const Header = styled.header`
display: grid;
grid-template-columns: 1fr 5fr 1fr;
grid-template-rows: 1fr;
gap: 1px 1px;
grid-template-areas: "Logo Links SignOut";
grid-area: Header;
position: sticky;
top: 0;
height: 42px;
width: 100%;
display: grid;
background-color: #4a76a8;
border-bottom: 1px solid #4872a3;
box-sizing: border-box;
z-index: 90;
`

const GridLogo = styled(Link)`
grid-area: Logo;
`


const GridUl = styled.ul`
margin: 0;
grid-area: Links;
margin: auto;
li {
	display: inline-block;
	padding-right: 10px;
}
`

const LiLink = styled(Link)`
display: inline-block;
background-color: #5b88bd;
border-radius: 5px;
color: white;
text-decoration: none;
padding: 10px;

`



const header = props => (
	            <Header>
				    <GridLogo to="/">
				        <Logo />
					</GridLogo>
					<GridUl>
					  <li>
					    <LiLink to ="/bands">Bands</LiLink>
					  </li>
					  <li>
					    <LiLink to ="/users">Users</LiLink>
					  </li>
					  <li>
					    <LiLink to ="/chats">Chats</LiLink>
					  </li>
					</GridUl>
					{props.name ? <SignOut /> : null}
                </Header>
)

export default header;
