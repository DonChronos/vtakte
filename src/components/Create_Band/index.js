import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userRef, bandRef } from '../Firebase';


// add loading state, disable button when loading
const Create_Band = (props) => {
	const [name, setName] = useState('');
	const [error, setError] = useState(null);
	const [partOf, setPartOf] = useState(true);
	const [loading, setLoading] = useState(true);
	let history = useHistory();
	useEffect(() => {
		userRef(props.uid).once('value').then(snapshot => {
		setPartOf(snapshot.child('b').exists());
		setLoading(false);
	  });
	}, []);
	
	console.log(partOf);
	console.log(loading);
	if (loading) return <h3>Loading...</h3>;
	const onSubmit = event => {
		if (loading) return;
		setLoading(true);
		let bandKey = userRef(props.uid).child('b').push().key;
		console.log(bandKey);
		let update = {};
		update[props.uid] = props.name;
		userRef(props.uid).update({b: bandKey})
		.then(() => {
			bandRef(bandKey).set({
				n: name,
				m: update
			})
		})
		.then(() => {
			setName('');
			history.push('/');
		})
		.catch(error => {
			setError(error);
			console.log(error.message);
		});
		event.preventDefault();
	}
	const onChange = event => {
		let target = event.target;
		setName(target.value);
	}
	if (partOf) return <p>You're already a part of a band</p>;
	return (
	<form onSubmit={onSubmit}>
	<input
	name='name'
	value={name}
	onChange={onChange}
	type='text'
	placeholer='Band Name'
	maxLength={16}
	/>

	<button disabled={!name || loading} type='submit'>Create Band</button>
	{error && <p>{error.message} Try again later.</p>}
	</form>
	);
}

export default Create_Band;