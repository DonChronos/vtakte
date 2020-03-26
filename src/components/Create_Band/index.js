import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userRef, bandRef } from '../Firebase';


// fix partOf bug
const Create_Band = (props) => {
	const [name, setName] = useState('');
	const [error, setError] = useState(null);
	let history = useHistory();
	let partOf = userRef(props.uid).once('value').then(snapshot => snapshot.child('band').exists());
	console.log(partOf);
	if (partOf) return <p>You're already a part of a band</p>;
	const onSubmit = event => {
		let bandKey = userRef(props.uid).child('band').push().key;
		console.log(bandKey);
		let update = {};
		update[props.uid] = props.name;
		userRef(props.uid).child('band').update(bandKey)
		.then(() => {
			bandRef(bandKey).set({
				name,
				members: update
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
	
	return (
	<form onSubmit={onSubmit}>
	<input
	name='name'
	value={name}
	onChange={onChange}
	type='text'
	placeholer='Band Name'
	/>

	<button disabled={!name} type='submit'>Create Band</button>
	{error && <p>{error.message} Try again later.</p>}
	</form>
	);
}

export default Create_Band;