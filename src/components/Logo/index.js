import React from 'react';
import taktLogo from './takt.svg';
import styled from 'styled-components';

const Logo = styled.div`
height: 42px;
width: 50px;
img {
	height: 100%;
}
@media (max-width: 500px) {
	display: none;
}
`

const logo = props => (
<Logo>
<img src={taktLogo} alt="Takt" />
</Logo>
)

export default logo;