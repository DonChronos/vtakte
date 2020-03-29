import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import styled from 'styled-components';
import SignOut from '../SignOut';

const Header = styled.header`
position: sticky;
top: 0;
height: 42px;
width: 100%;
display: flex;
background-color: #4a76a8;
justify-content: space-between;
border-bottom: 1px solid #4872a3;
align-items: center;
padding: 0 20px;
box-sizing: border-box;
z-index: 90;
`

const header = props => (
	            <Header>
				    <Link to="/">
				        <Logo />
					</Link>
					<ul>
					  <li>
					    <Link to ="/bands">Bands</Link>
					  </li>
					  <li>
					    <Link to ="/users">Users</Link>
					  </li>
					  <li>
					    <Link to ="chats/">Chats</Link>
					  </li>
					  {props.name ? <SignOut /> : null}
					</ul>
                </Header>
)

export default header;