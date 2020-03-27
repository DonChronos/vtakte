import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { auth,  userRef, bandRef } from '../Firebase';

const INITIAL_STATE = {
	loading: true,
	profile: {},
}

const isEmpty = (obj) => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
}
// split profile component in two
const User = (props) => {
	console.log('render check 0');
	let { uid } = useParams();
	let history = useHistory();
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	console.log('render check state declaration');
	useEffect(() => {
		console.log('useEffect start');
		userRef(uid).on('value', snapshot => {
		console.log('observer fired up');
		const userObject = snapshot.val();
		setState(() => ({
			loading: false,
			profile: userObject,
		}))
	});
	return () => {
		console.log('useEffect return');
		setState(() => ({...INITIAL_STATE}));
		userRef(uid).off();
	}
	}, []);
	let { loading, profile } = state;
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(profile)) return <p>404: Does not exist</p>;
	
	const deleteUser = () => {
		if (userRef(uid).child('band').exists()) {
		bandRef(uid).child('members/'+props.uid).remove()
		.then(() => {
			bandRef(uid).child('members').once('value', snapshot => {
			if (!snapshot.exists()) bandRef(uid).remove();
			})
		})
	    .catch(error => {
			setError(error);
			console.log(error)
		});
		}
	    userRef(uid).remove()
		.then(history.push('/'))
		.then(auth.delete())
		.catch(error => {
			setError(error);
			console.log(error);
	})
	}
	
	console.log(profile);
	console.log('render check 1');
	return (
	<>
	{props.uid === uid ? <p>This is you</p> : null}
	<p>{profile.username}</p>
	<p>{profile.role}</p>
	{profile.band ? <Link to={'/bands/'+profile.band}>Band</Link> : null}
	{props.uid === uid ? <button onClick={() => deleteUser(uid)}>Delete profile</button> : null}
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default User;