import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doSignUp, userRef } from '../Firebase';
import * as roles from '../Roles';

const INITIAL_STATE = {
		username: '',
		role: 'drummer',
		email: '',
		passwordOne: '',
		passwordTwo: '',
	}
// on loading disable button to prevent multiple calls to database
// check if after signout it's still possible to sign up another account
const SignUp = () => {
	const [user, setUser] = useState({...INITIAL_STATE});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	let { username, role, email, passwordOne, passwordTwo } = user;
	let history = useHistory();
	const onSubmit = event => {
		let uid;
		if (loading) return;
		setLoading(true);
		doSignUp(email, passwordOne)
		.then(authUser => {
			uid = authUser.user.uid;
			return authUser.user.updateProfile({
				displayName: username,
				photoURL: role,
			});
		})
		.then(() => {
			return userRef(uid).set({
				u: username,
				r: role,
			});
		})
		.then(() => {
			setUser({...INITIAL_STATE});
			setLoading(false);
			history.push('/');
			return history.go(0);
		})
		.catch(error => {
			setError(error);
		});
		// on success should create user in database and the have history pushed to home
		event.preventDefault();
	}
	const onChange = event => {
		let target = event.target;
		setUser(state => ({...state, [target.name]: target.value}));
	}
	const isInvalid = passwordOne !== passwordTwo ||
	passwordOne === '' ||
	email === '' ||
	username === '';
	// add proper validation with regex
	return (
	<form onSubmit={onSubmit}>
	<input
	name='username'
	value={username}
	onChange={onChange}
	type='text'
	placeholder='Username'
	maxLength={16}
	/>
	<label style={{display: 'inline-block'}}>
	<input
	name='role'
	value='drummer'
	onChange={onChange}
	type='radio'
	checked={role === 'drummer'}
	/>
	<roles.Drummer />
	</label>
	<label style={{display: 'inline-block'}}>
	<input
	name='role'
	value='singer'
	onChange={onChange}
	type='radio'
	checked={role === 'singer'}
	/>
	<roles.Singer />
	</label>
	<label style={{display: 'inline-block'}}>
	<input
	name='role'
	value='guitar'
	onChange={onChange}
	type='radio'
	checked={role === 'guitar'}
	/>
	<roles.Guitar />
	</label>
	<label style={{display: 'inline-block'}}>
	<input
	name='role'
	value='bass'
	onChange={onChange}
	type='radio'
	checked={role === 'bass'}
	/>
	<roles.Bass_Guitar />
	</label>
	<label style={{display: 'inline-block'}}>
	<input
	name='role'
	value='piano'
	onChange={onChange}
	type='radio'
	checked={role === 'piano'}
	/>
	<roles.Piano />
	</label>
	<input
	name='email'
	value={email}
	onChange={onChange}
	type='email'
	required
	placeholder='Email Address'
	/>
	<input
	name='passwordOne'
	value={passwordOne}
	onChange={onChange}
	type='password'
	placeholder='Password'
	/>
	<input
	name='passwordTwo'
	value={passwordTwo}
	onChange={onChange}
	type='password'
	placeholder='Confirm Password'
	/>
	<button disabled={isInvalid} type='submit'>Sign Up</button>
	{error && <p>{error.message} Try again later.</p>}
	</form>
	);
}

export default SignUp;