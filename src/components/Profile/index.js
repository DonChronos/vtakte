import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// add Links to band/band members

const INITIAL_STATE = {
	loading: true,
	profile: [],
}
// const testSubject = userRef; <-- abstraction can be successful
const Profile = (props) => {
	let { uid } = useParams();
	const [state, setState] = useState({...INITIAL_STATE});
	const observer = props.observer
	useEffect(() => {
		observer(uid).once('value', snapshot => {
		const userObject = snapshot.val();
		const userList = Object.entries(userObject);
		setState({
			loading: false,
			profile: userList,
		})
	});
	return () => setState({
		loading: true,
		profile: [],
	})
	}, [uid]);
    let { loading, profile } = state;
	console.log(profile);
	return (
	<div>
	{loading && <h3>Loading...</h3>}
	<ul>
	{props.uid === uid ? <p>This is you</p> : null}
	{profile.map(e => (
		<li key={e[0]}>
		<p>{e[0]+e[1]}</p>
		</li>
	))}
	</ul>
	</div>
	);
}

export default Profile;