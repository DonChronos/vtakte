import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bandsRef } from '../Firebase';

const INITIAL_STATE = {
	loading: true,
	list: {},
}
const isEmpty = (obj) => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
}

// split list component in two
console.log('users component loaded');
const Bands = (props) => {
	const [state, setState] = useState({...INITIAL_STATE});
	useEffect(() => {		
		bandsRef().on('value', snapshot => {
		const bandsObject = snapshot.val();
		//check for null
		console.log(bandsObject);
		setState({
		loading: false,
		list: bandsObject,
		});
	});
	return () => {
		setState({...INITIAL_STATE});
		return bandsRef().off('value');
	}
	}, []);
	let { loading, list } = state;
	console.log('list return');
	return (
	<div>
	<h1>Bands</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{isEmpty(list) ? <p>There are no bands yet.</p> : Object.entries(list).map(e => {
	console.log(e);
	return (
	<li key={e[0]}>
	<p>{e[1].name}</p>
	<p>Number of members: {Object.keys(e[1].members).length}</p>
	<Link to={'bands/'+e[0]}>Profile</Link>
	</li>
	)})}
	</ul>
	</div>
	);
};

export default Bands;