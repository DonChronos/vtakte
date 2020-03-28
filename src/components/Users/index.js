import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersRef } from '../Firebase';

const INITIAL_STATE = {
	loading: true,
	list: {},
}
// split list component in two
console.log('users component loaded');
const Users = () => {
	const [state, setState] = useState({...INITIAL_STATE});
	useEffect(() => {		
		usersRef().on('value', snapshot => {
		const usersObject = snapshot.val();
		//check for null
		console.log(usersObject);
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
	console.log('list return');
	return (
	<div>
	<h1>Users</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{Object.entries(list).map(e => {
	return (
	<li key={e[0]}>
	<p>Role {e[1].r}</p>
	<p>Username {e[1].u}</p>
	{e[1].b ? <p>Part of a band</p> : null}
	<Link to={'users/'+e[0]}>Profile</Link>
	</li>
	)})}
	</ul>
	</div>
	);
};

export default Users;