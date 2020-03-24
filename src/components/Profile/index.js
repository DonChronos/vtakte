import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// add JoinBand and startChat buttons

const INITIAL_STATE = {
	loading: true,
	profile: {},
}
// const testSubject = userRef; <-- abstraction can be successful
const Profile = (props) => {
	let { uid } = useParams();
	const [state, setState] = useState({...INITIAL_STATE});
	const observer = props.observer
	useEffect(() => {
		observer(uid).once('value', snapshot => {
		const userObject = snapshot.val();
		setState({
			loading: false,
			profile: userObject,
		})
	});
	return () => {
		setState({...INITIAL_STATE})
	}
	}, [uid]);
    let { loading, profile } = state;
	console.log(profile);
	if (loading) return <h3>Loading...</h3>
	return (
	<div>
	{props.uid === uid ? <p>This is you</p> : null}
	{profile.role ? <><p>{profile.username}</p><p>{profile.role}</p>{profile.band ? <Link to={'/bands/'+profile.band}>Band</Link> : null}</> :
	<><p>{profile.name}</p><ul>{Object.keys(profile.members).map(e => (
	<li key={e}>
	<Link to={'/users/'+e}>Member</Link>{props.uid === e ? ' This is you' : null}
	</li>
	))}</ul></>}
	</div>
	);
}

export default Profile;