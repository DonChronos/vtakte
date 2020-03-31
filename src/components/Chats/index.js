import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { activeChatsRef, chatMembersRef, chatRef } from '../Firebase';
import Ul from '../Ul';
import Button from '../Button';

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
		chatMembersRef().child(props.uid).off();
	}
	}, []);
	const deleteChat = chatUid => {
		console.log(chatUid);
		let number;
		activeChatsRef().child(chatUid).once('value', snapshot => {
			console.log(snapshot.val());
			return number = snapshot.val();
		}).then(() => {
			console.log(number);
			if (number === 2) {
				chatMembersRef().child(props.uid).child(chatUid).remove();
				activeChatsRef().child(chatUid).set(1);
			} else if (number === 1) {
				chatMembersRef().child(props.uid).child(chatUid).remove();
				chatRef(chatUid).remove();
				activeChatsRef().child(chatUid).remove();
			}
		}).catch(error => {
			setError(error);
			console.log(error);
		})
	}
	let { loading, chats } = state;
	console.log(chats);
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(chats)) return <p>You don't have any active chats</p>;
	return (
	<>
	<h1>Chats</h1>
	{loading && <h3>Loading...</h3>}
	<Ul>
	{Object.entries(chats).map(e => {
		let chatUid = e[0];
		let otherUserUid = e[0].replace(props.uid, '');
		let chatUrl = '/chats/' + e[0];
	return (
	<li key={chatUid}>
	<p>{e[1].r}</p>
	<p>{e[1].u}</p>
	<Link to={{
		pathname: chatUrl,
		state: {
			uid: otherUserUid,
		},
		}}>Chat</Link>
		<br />
		<Button style={{backgroundColor: 'red'}}onClick={(e) => deleteChat(chatUid, e)}>Delete chat</Button>
	</li>
	
	)
	})}
	</Ul>
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default Chats;