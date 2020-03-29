import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { chatRef, chatMembersRef, activeChatsRef } from '../Firebase';

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
		// if chat does exist, check if user is part of chat, then
        // order data by creation time child, fetch once, then
		// start observing at chatmessages(uid of the other person)
		
		// if user deletes chat, delete it from both ends
const Chat = props => {
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	let location = useLocation();
	let { uid } = useParams();
	console.log(location);
	// check if useEffect works correctly
	console.log('before useEffect');
	useEffect(() => {
		console.log('useEffect')
		let chatExists = false;
		let chatObject = {};
		activeChatsRef(uid).once('value').then(snapshot => {
			chatExists = snapshot.exists();
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
				chatMembersRef().update(update)
			}
		}).then(() => {
			chatRef(uid).orderByChild('time').on('value', snapshot => {
				setState({
					loading: false,
					chat: chatObject,
				})
			})
		})
		.catch(error => {
			setError(error);
			console.log(error)
		});
	return () => {
		console.log('useEffect return');
		setState(() => ({...INITIAL_STATE}));
		chatRef(uid).off();
	}
	}, []);
	if (!location.state) return <h1>Illegal action detected</h1>
	const onSubmit = event => {
		let date = Date.now();
		chatRef(uid).push().set({
			sender: props.name,
			message: input,
			time: date,
		}).catch(error => {
			setError(error);
			console.log(error);
		})
	};
	let { loading, chat } = state;
	let input = React.createRef();
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(chat)) return <p>There are no</p>;
	return (
	<>
	<h1>Chat</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{Object.entries(chat).map(e => {
		  console.log(e);
	return (
	<li key={e[0]}>
	<p>Sent by {e[1].sender}</p>
	<p>{e[1].message}</p>
	<p>{e[1].time}</p>
	</li>
	)
	})}
	</ul>
	<form onSubmit={onSubmit}>
	<textarea ref={input}></textarea>
	<button disabled={input} type='submit'>Submit</button> 
	</form>
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default Chat;