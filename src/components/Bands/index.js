import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bandsRef } from '../Firebase';
import Ul from '../Ul';

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

const Bands = () => {
	const [state, setState] = useState({...INITIAL_STATE});
	useEffect(() => {		
		bandsRef().on('value', snapshot => {
		const bandsObject = snapshot.val();
		//check for null

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

	return (
	<div>
	<h1>Bands</h1>
	{loading && <h3>Loading...</h3>}
	<Ul>
	{isEmpty(list) ? <p>There are no bands yet.</p> : Object.entries(list).map(e => {
	return (
	<li key={e[0]}>
	<p>Name {e[1].n}</p>
	<p>Number of members: {Object.keys(e[1].m).length}</p>
	<Link to={'bands/'+e[0]}>Profile</Link>
	</li>
	)})}
	</Ul>
	</div>
	);
};

export default Bands;