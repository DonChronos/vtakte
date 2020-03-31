import React from 'react';
import styled from 'styled-components';
import drummer from './drummer.svg';
import bass_guitar from './bass_guitar.svg';
import guitar from './guitar.svg';
import piano from './piano.svg';
import singer from './singer.svg';

const Logo = styled.div`
height: 42px;
width: 50px;
margin: auto;
img {
	height: 100%;
}
`

export const Drummer = () => (
<Logo>
<img src={drummer} alt="Drummer" />
</Logo>
);

export const Guitar = () => (
<Logo>
<img src={guitar} alt="Guitarist" />
</Logo>
);

export const Bass_Guitar = () => (
<Logo>
<img src={bass_guitar} alt="Bass Guitarist" />
</Logo>
);

export const Piano = () => (
<Logo>
<img src={piano} alt="Pianist" />
</Logo>
);

export const Singer = () => (
<Logo>
<img src={singer} alt="Singer" />
</Logo>
);