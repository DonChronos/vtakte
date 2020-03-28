import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { chatsRef } from '../Firebase';

const INITIAL_STATE = {
	loading: true,
	chat: {},
}

const isEmpty = (obj) => {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) return false;
	}
	return true;
}
		// check if chat exists (in chatsactive), if not, add to chatsactive (push().key),
		// read data from both users(pass props from app, pass props from user Link), 
		// add to chats, then start observing at chatmessages(uid of the other person).
		// if chat does exist, order data by creation time child, fetch once, then
		// start observing at chatmessages(uid of the other person)
const Chat = props => {
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	console.log('render check state declaration');
	useEffect(() => {
		
	});
	return () => {
		console.log('useEffect return');
		setState(() => ({...INITIAL_STATE}));
		chatsRef(props.uid).off();
	}
	}, []);
	let { loading, chat } = state;

	return (
	<>
	<h1>Chat</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{isEmpty(chats) ? <p>You don't have any active chats</p> :
      {Object.entries(chat).map(e => {
		  console.log(e);
	return (
	
	)
	})}
	</ul>
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default Chat;