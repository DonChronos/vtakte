import React, { useState, useEffect } from 'react';
import { usersRef } from '../Firebase';

const INITIAL_STATE = {
	loading: false,
	users: [],
}
// todo - make list component more abstract to fit users, groups, messages etc.
const Users = props => {
	const [user, setUser] = useState(INITIAL_STATE);

	useEffect(() => {
		usersRef().on('value', snapshot => {
		const usersObject = snapshot.val();
		console.log('observer');
		const usersList = Object.keys(usersObject).map(key => ({
			...usersObject[key],
			uid: key,
		}));
		setUser({
		loading: false,
		users: usersList,
		});
		console.log(usersList);
	});
	return () => usersRef().off();
	}, []);
	let { loading, users } = user;
	return (
	<div>
	<h1>Users</h1>
	{loading && <h3>Loading...</h3>}
	<ul>
	{users.map(user => (
	<li key={user.uid}>
	<p>{user.uid}</p>
	<p>{user.username}</p>
	<p>{user.role}</p>
	</li>
	))}
	</ul>
	</div>
	);
};

export default Users;