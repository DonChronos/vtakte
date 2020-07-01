import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { auth,  userRef, bandRef, chatMembersRef } from '../Firebase';
import Button from '../Button';
import * as roles from '../Roles';

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
	let { uid } = useParams();
	let history = useHistory();
	const [state, setState] = useState({...INITIAL_STATE});
	const [error, setError] = useState(false);
	useEffect(() => {
		userRef(uid).on('value', snapshot => {
		const userObject = snapshot.val();
		setState(() => ({
			loading: false,
			profile: userObject,
		}))
	});
	return () => {
		setState(() => ({...INITIAL_STATE}));
		userRef(uid).off();
	}
	}, []);
	let { loading, profile } = state;
	if (loading) return <h3>Loading...</h3>;
	if (isEmpty(profile)) return <p>404: Does not exist</p>;
	if (error === 'chat') return <p>You need to delete all your chats before you can delete your profile.</p>;
	const deleteUser = () => {
		if (chatMembersRef().child(uid).once('value', snapshot => snapshot.exists())) return setError('chat');
		if (userRef(uid).child('b').once('value', snapshot => snapshot.exists())) {
		bandRef(uid).child('m/'+props.uid).remove()
		.then(() => {
			bandRef(uid).child('m').once('value', snapshot => {
			if (!snapshot.exists()) bandRef(uid).remove();
			})
		})
	    .catch(error => {
			setError(error);

		});
		}
		/* add delete chat
		if (chatMembersRef().child(uid).once('value', snapshot => snapshot.exists())) {
			let number;
		activeChatsRef().child(chatUid).once('value', snapshot => {
			console.log(snapshot.val());
			return number = snapshot.val();
		}).then(() => {
			console.log(number);
			// would be more efficient with firebase update()
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
		*/
	    userRef(uid).remove()
		.then(auth.currentUser.delete())
		.catch(error => {
			setError(error);

	})
	}
	

	let chatUid = props.uid < uid ? props.uid+uid : uid+props.uid;
	let chatUrl = '/chats/'+chatUid;
	return (
	<>
	{props.uid === uid ? <p>This is you</p> : 
	<Link to={{
		pathname: chatUrl,
		state: {
			u: profile.u,
			r: profile.r,
			uid: uid,
		},
		}}>Start chatting</Link>}
	{profile.r === 'singer' ? <roles.Singer /> : profile.r === 'drummer' ? <roles.Drummer /> :
	profile.r === 'bass' ? <roles.Bass_Guitar /> : profile.r === 'guitar' ? <roles.Guitar /> :
	<roles.Piano />}
	<p>{profile.u}</p>
	{profile.b ? <Link to={'/bands/'+profile.b}>Band</Link> : null}
	{props.uid === uid ? <Button style={{backgroundColor: 'red'}} onClick={() => deleteUser(uid)}>Delete profile</Button> : null}
	{error && <p>{error.message} Try again later.</p>}
	</>
	)
}

export default User;