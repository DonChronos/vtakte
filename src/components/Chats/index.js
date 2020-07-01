import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { activeChatsRef, chatMembersRef, chatRef } from '../Firebase';
import Ul from '../Ul';
import Button from '../Button';
import * as roles from '../Roles';

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
	useEffect(() => {
		chatMembersRef().child(props.uid).on('value', snapshot => {
		const userObject = snapshot.val();
		setState(() => ({
			loading: false,
			chats: userObject,
		}))
	})
	return () => {
		setState(() => ({...INITIAL_STATE}));
		chatMembersRef().child(props.uid).off();
	}
}, [props.uid]);
	const deleteChat = chatUid => {
		let number;
		activeChatsRef().child(chatUid).once('value', snapshot => {
			return number = snapshot.val();
		}).then(() => {
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
		})
	}
	let { loading, chats } = state;
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
	<p>{e[1].r === 'singer' ? <roles.Singer /> : e[1].r === 'drummer' ? <roles.Drummer /> :
	e[1].r === 'bass' ? <roles.Bass_Guitar /> : e[1].r === 'guitar' ? <roles.Guitar /> :
	<roles.Piano />}</p>
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
;
export default Chats;
