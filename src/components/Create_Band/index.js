import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userRef, bandRef } from '../Firebase';

const Create_Band = (props) => {
	const [name, setName] = useState('');
	const [error, setError] = useState(null);
	let history = useHistory();
	if (userRef(props.uid).once('value').then(snapshot => snapshot.child('band')
	.exists())) return (<p>You're already a part of a band</p>)
	const onSubmit = event => {
		let bandKey = userRef(props.uid).child('band').push().key;
		console.log(bandKey);
		let update1 = {};
		update1[bandKey] = true;
		let update2 = {};
		update2[props.uid] = true;
		userRef(props.uid).child('band').update(update1)
		.then(() => {
			bandRef(bandKey).set({
				name,
				members: update2
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
		// on success should create user in database and the have history pushed to home
		event.preventDefault();
	}
	const onChange = event => {
		let target = event.target;
		setName(target.value);
	}
//  add proper validation with regex
	
	return (
	<form onSubmit={onSubmit}>
	<input
	name='name'
	value={name}
	onChange={onChange}
	type='text'
	placeholer='Email Address'
	/>

	<button disabled={!name} type='submit'>Create Band</button>
	{error && <p>{error.message} Try again later.</p>}
	</form>
	);
}

export default Create_Band;