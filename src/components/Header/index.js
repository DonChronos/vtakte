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

const Grid_Logo = styled(Link)`
grid-area: Logo;
`


const Grid_Ul = styled.ul`
margin: 0;
grid-area: Links;
margin: auto;
li {
	display: inline-block;
	padding-right: 10px;
}
`

const Li_Link = styled(Link)`
display: inline-block;
background-color: #5b88bd;
border-radius: 5px;
color: white;
text-decoration: none;
padding: 10px;

`



const header = props => (
	            <Header>
				    <Grid_Logo to="/">
				        <Logo />
					</Grid_Logo>
					<Grid_Ul>
					  <li>
					    <Li_Link to ="/bands">Bands</Li_Link>
					  </li>
					  <li>
					    <Li_Link to ="/users">Users</Li_Link>
					  </li>
					  <li>
					    <Li_Link to ="/chats">Chats</Li_Link>
					  </li>
					</Grid_Ul>
					{props.name ? <SignOut /> : null}
                </Header>
)

export default header;