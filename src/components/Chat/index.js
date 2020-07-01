import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { chatRef, chatMembersRef, activeChatsRef } from '../Firebase';
import Ul from '../Ul';

const INITIAL_STATE = {
	loading: true,
	chat: {},
	isNot1: null,
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
		// if chat does exist, check if user is part of chat, then
        // order data by creation time child, fetch once, then
		// start observing at chatmessages(uid of the other person)

		// if user deletes chat, delete it from both ends
		// change ref to setstate, see if that works better
		// also implement the delete chat button, probably in the chats plural component
const Chat = props => {
	const [state, setState] = useState({...INITIAL_STATE});
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	let location = useLocation();
	let { uid } = useParams();

	// check if useEffect works correctly

	useEffect(() => {

		let chatExists = true;
		let chatObject = {};
		activeChatsRef().child(uid).once('value').then(snapshot => {
			return chatExists = snapshot.val();
		}).then(() => {

			if (!chatExists) {
				let update = {};
				update[props.uid] = {
					[uid]: {
						r: location.state.r,
						u: location.state.u,
					}
				};
				update[location.state.uid] = {
					[uid]: {
						r: props.role,
						u: props.name,
					}
				}
				chatMembersRef().set(update);
				activeChatsRef().set({
					[uid]: 2,
				})
			}
		}).then(() => {
			chatRef(uid).orderByChild('time').on('value', snapshot => {
				chatObject = snapshot.val();
				setState({
					loading: false,
					chat: chatObject,
					isNot1: chatExists,
				})
			})
		})
		.catch(error => {
			setError(error);

		});
	return () => {

		setState(() => ({...INITIAL_STATE}));
		chatRef(uid).off();
	}
	}, []);
	if (!location.state) return <h1>Illegal action detected</h1>
	const onSubmit = event => {
		let date = Date.now();
		let trueDate = new Date(date).toISOString().slice(-13, -5);
		chatRef(uid).push().set({
			sender: props.name,
			message: message,
			time: trueDate,
		}).catch(error => {
			setError(error);

		})
		event.preventDefault();
	};
	const onChange = event => {
		let target = event.target;
		setMessage(target.value);
	}
	let { loading, chat, isNot1 } = state;

	if (loading) return <h3>Loading...</h3>;
	return (
	<>
	<h1>Chat</h1>
	{loading && <h3>Loading...</h3>}
	{isNot1 === 1 ? <p>This person deleted this chat, it's advisable that you do the same</p> : null}
	<Ul>
	{isEmpty(chat) ? <p>There are no messages yet</p> : Object.entries(chat).map(e => {
	return (
	<li key={e[0]}>
	<p>Sent by {e[1].sender}</p>
	<p>{e[1].message}</p>
	<p>{e[1].time}</p>
	</li>
	)
	})}
	</Ul>
	<form onSubmit={onSubmit}>
	<textarea
	value={message}
	onChange={onChange}></textarea>
	<button disabled={!message} type='submit'>Submit</button>
	</form>
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default Chat;
