import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { userRef, bandRef } from '../Firebase';

const INITIAL_STATE = {
	loading: true,
	profile: {},
	isInBand: false,
}

const isEmpty = (obj) => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
}
// split profile component in two
const Band = (props) => {
	console.log('render check 0');
	let { uid } = useParams();
	let history = useHistory();
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	console.log('render check state declaration');
	useEffect(() => {
		let userObject;
		bandRef(uid).on('value', snapshot => {
		console.log('observer fired up');
		userObject = snapshot.val();
	});
	    
	    userRef(props.uid).once('value', snapshot => {
			if (snapshot.child('band').exists()) {
			setState(() => ({
			  loading: false,
			  profile: userObject,
			  isInBand: true,
		    }))
			} else {
			setState(() => ({
			  loading: false,
			  profile: userObject,
			  isInBand: true,
		    }))
			}
		})
	return () => {
		console.log('useEffect return');
		setState(() => ({...INITIAL_STATE}));
		bandRef(uid).off();
	}
	}, []);
	let { loading, profile, isInBand } = state;
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(profile)) return <p>404: Does not exist</p>;
	const joinBand = () => {
		let update = {};
		update[props.uid] = props.name;
		userRef(props.uid).update({band: uid})
		.then(() => {
			bandRef(uid).child('members').update(update)
		})
		.catch(error => {
			setError(error);
			console.log(error);
		})
	}
	const leaveBand = () => {
		bandRef(uid).child('members/'+props.uid).remove()
		.then(() => {
			bandRef(uid).child('members').once('value', snapshot => {
			if (!snapshot.exists()) bandRef(uid).remove();
		})
	    })
		.then(() => userRef(props.uid).child('band').remove())
	    .then(() => {
			history.push('/');
		})
		.catch(error => {
			setError(error);
			console.log(error);
		})
	}
	console.log(profile);
	console.log('render check 1');
	console.log('render check 3');
	let isMember = false;
	if (profile.members) {
		isMember = profile.members[props.uid];
	}
	console.log(isInBand);
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
	{isMember ? <button onClick={leaveBand}>Leave Band</button> : isInBand ? null : <button onClick={joinBand}>Join Band</button>}
	</ul>
	{error && <p>{error.message} Try again later.</p>}
	</>
	);
}

export default Band;