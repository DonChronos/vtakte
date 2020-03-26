import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { auth, userRef, bandRef } from '../Firebase';

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
const Profile = (props) => {
	console.log('render check 0');
	let { uid } = useParams();
	let history = useHistory();
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	const observer = props.observer;
	console.log('render check state declaration');
	useEffect(() => {
		console.log('useEffect start');
		observer(uid).on('value', snapshot => {
		console.log('observer fired up');
		const userObject = snapshot.val();
		setState(() => ({
			loading: false,
			profile: userObject,
		}))
	});
	return () => {
		console.log('useEffect return');
		observer(uid).off();
		setState(() => ({...INITIAL_STATE}));	
	}
	}, [observer]);
	let { loading, profile } = state;
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(profile)) return <p>404: Does not exist</p>;
	const joinBand = () => {
		let update = {};
		update[props.uid] = props.name;
		userRef(props.uid).child('band').update(uid)
		.then(() => {
			bandRef(uid).child('members').update(update)
		})
		.catch(error => {
			setError(error);
			console.log(error);
		})
	}
	const leaveBand = () => {
		userRef(props.uid).child('band').remove()
		.then(() => {
			bandRef(uid).child('members/'+props.uid).remove()
		})
		.then(() => {
			if (!(bandRef(uid).child('members').exists())) bandRef(uid).remove()
		})
	    .then(() => {
			history.push('/');
		})
		.catch(error => {
			setError(error);
			console.log(error);
		})
	}
	const deleteUser = () => {
		if (userRef(uid).child('band').exists()) bandRef(uid).child('members/'+props.uid).remove()
		.then(() => {
			if (!(bandRef(uid).child('members').hasChildren())) bandRef(uid).remove()
		})
	    .catch(error => {
			setError(error);
			console.log(error)
		});
	    userRef(uid).remove()
		//.then(history.push('/'))
		.then(auth.delete())
		.catch(error => {
			setError(error);
			console.log(error);
	})
	}
	
	console.log(profile);
	console.log('render check 1');
	if (profile.role) return (
	<>
	{props.uid === uid ? <p>This is you</p> : null}
	<p>{profile.username}</p>
	<p>{profile.role}</p>
	{profile.band ? <Link to={'/bands/'+profile.band}>Band</Link> : null}
	{props.uid === uid ? <button onClick={() => deleteUser(uid)}>Delete profile</button> : null}
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
	console.log('render check 3');
	let isMember = profile.members[props.uid];
	return (
	<>
	<p>{profile.name}</p>
	<ul>{Object.entries(profile.members).map(e => {
	return (
	<li key={e[0]}>
	<Link to={'/users/'+e[0]}>{e[1]}</Link>{props.uid === e[0] ? ' This is you' : null}
	</li>
	)
	})}
	{isMember ? <button onClick={leaveBand}>Leave Band</button> : <button onClick={joinBand}>Join Band</button>}
	</ul>
	{error && <p>{error.message} Try again later.</p>}
	</>
	);
}

export default Profile;