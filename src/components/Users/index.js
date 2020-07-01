import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersRef } from '../Firebase';
import Ul from '../Ul';
import * as roles from '../Roles';

const INITIAL_STATE = {
	loading: true,
	list: {},
}
// split list component in two

const Users = () => {
	const [state, setState] = useState({...INITIAL_STATE});
	useEffect(() => {		
		usersRef().on('value', snapshot => {
		const usersObject = snapshot.val();
		//check for null

		setState({
		loading: false,
		list: usersObject,
		});
	});
	return () => {
		setState({...INITIAL_STATE});
		return usersRef().off('value');
	}
	}, []);
	let { loading, list } = state;

	// the ternary expression can be implemented a lot better
	return (
	<div>
	<h1>Users</h1>
	{loading && <h3>Loading...</h3>}
	<Ul>
	{Object.entries(list).map(e => {
	return (
	<li style={{border: '1px solid black'}} key={e[0]}>
	{e[1].r === 'singer' ? <roles.Singer /> : e[1].r === 'drummer' ? <roles.Drummer /> :
	e[1].r === 'bass' ? <roles.Bass_Guitar /> : e[1].r === 'guitar' ? <roles.Guitar /> :
	<roles.Piano />}
	<p>{e[1].u}</p>
	{e[1].b ? <p>Part of a band</p> : null}
	<Link to={'users/'+e[0]}>Profile</Link>
	</li>
	)})}
	</Ul>
	</div>
	);
};

export default Users;