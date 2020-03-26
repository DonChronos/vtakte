import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
	loading: true,
	list: [],
}

// split list component in two
console.log('users component loaded');
const List = (props) => {
	const [state, setState] = useState({...INITIAL_STATE});
    const observer = props.observer;
	useEffect(() => {		
		observer().on('value', snapshot => {
		const usersObject = snapshot.val();
		//check for null
		const usersList = Object.keys(usersObject).map(key => ({
			...usersObject[key],
			uid: key,
		}));
		console.log(usersList);
		setState({
		loading: false,
		list: usersList,
		});
	});
	return () => {
		setState({...INITIAL_STATE});
		return observer().off('value');
	}
	}, [props.type]);
	let { loading, list } = state;
	console.log('list return');
	return (
	<div>
	<h1>{props.type}</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{list.map(e => (
	<li key={e.uid}>
	<p>{e.uid}</p>
	{e.name ? <p>{e.name}</p> : null}
	{e.members ? <p>Number of members: {Object.keys(e.members).length}</p> : null}
	{e.username ? <p>{e.username}</p> : null}
	{e.role ? <p>{e.role}</p> : null}
	<Link to={'/'+props.type+'/'+e.uid}>Profile</Link>
	</li>
	))}
	</ul>
	</div>
	);
};

export default List;