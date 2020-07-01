import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { userRef, bandRef } from '../Firebase';
import Button from '../Button';
import Ul from '../Ul';

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
	let { uid } = useParams();
	let history = useHistory();
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	useEffect(() => {
		let bandObject;
		bandRef(uid).once('value', snapshot => {
		bandObject = snapshot.val();
	});
	    
	    userRef(props.uid).once('value', snapshot => {
			if (snapshot.child('band').exists()) {
			setState(() => ({
			  loading: false,
			  profile: bandObject,
			  isInBand: true,
		    }))
			} else {
			setState(() => ({
			  loading: false,
			  profile: bandObject,
			  isInBand: false,
		    }))
			}
		})
	return () => {
		setState(() => ({...INITIAL_STATE}));
	}
	}, []);
	let { loading, profile, isInBand } = state;
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(profile)) return <p>404: Does not exist</p>;
	const joinBand = () => {
		let update = {};
		update[props.uid] = props.name;
		userRef(props.uid).update({b: uid})
		.then(() => {
			bandRef(uid).child('m').update(update)
		})
		.then(() => {
			history.push('/bands');
		})
		.catch(error => {
			setError(error);
		})
	}
	const leaveBand = () => {
		bandRef(uid).child('m/'+props.uid).remove()
		.then(() => {
			bandRef(uid).child('m').once('value', snapshot => {
			if (!snapshot.exists()) bandRef(uid).remove();
		})
	    })
		.then(() => userRef(props.uid).child('b').remove())
	    .then(() => {
			history.push('/');
		})
		.catch(error => {
			setError(error);
		})
	}
	let isMember = false;
	if (profile.m) {
		isMember = profile.m[props.uid];
	}
	return (
	<>
	<h3>{profile.n}</h3>
	<Ul>{Object.entries(profile.m).map(e => {
	return (
	<li key={e[0]}>
	<Link to={'/users/'+e[0]}>{e[1]}</Link>{props.uid === e[0] ? ' This is you' : null}
	</li>
	)
	})}
	{isMember ? <Button style={{backgroundColor: 'red'}}onClick={leaveBand}>Leave Band</Button> : isInBand ? null : <Button onClick={joinBand}>Join Band</Button>}
	</Ul>
	{error && <p>{error.message} Try again later.</p>}
	</>
	);
}

export default Band;