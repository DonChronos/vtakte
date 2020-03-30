import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { chatMembersRef } from '../Firebase';

const INITIAL_STATE = {
	loading: true,
	chats: {},
}

const isEmpty = (obj) => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
}

const Chats = props => {
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	console.log('render check state declaration');
	useEffect(() => {
		console.log('useEffect start');
		chatMembersRef().child(props.uid).on('value', snapshot => {
			console.log(snapshot.val());
		console.log('observer fired up');
		const userObject = snapshot.val();
		setState(() => ({
			loading: false,
			chats: userObject,
		}))
	})
	return () => {
		console.log('useEffect return');
		setState(() => ({...INITIAL_STATE}));
		chatMembersRef(props.uid).off();
	}
	}, []);
	let { loading, chats } = state;
	console.log(chats);
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(chats)) return <p>You don't have any active chats</p>;
	return (
	<>
	<h1>Chats</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{Object.entries(chats).map(e => {
		let otherUserUid = e[0].replace(props.uid, '');
		let chatUrl = '/chats/' + e[0];
	return (
	<li key={e[0]}>
	<p>{e[1].r}</p>
	<p>{e[1].u}</p>
	<Link to={{
		pathname: chatUrl,
		state: {
			uid: otherUserUid,
		},
		}}>Chat</Link>
	</li>
	)
	})}
	</ul>
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default Chats;