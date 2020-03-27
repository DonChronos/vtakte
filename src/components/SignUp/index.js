import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doSignUp, userRef } from '../Firebase';

const INITIAL_STATE = {
		username: '',
		role: 'drummer',
		email: '',
		passwordOne: '',
		passwordTwo: '',
	}
// on loading disable button to prevent multiple calls to database
const SignUp = () => {
	const [user, setUser] = useState({...INITIAL_STATE});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	let { username, role, email, passwordOne, passwordTwo } = user;
	let history = useHistory();
	console.log(history);
	console.log(user);
	console.log(error);
	const onSubmit = event => {
		if (loading) return;
		setLoading(true);
		doSignUp(email, passwordOne)
		.then(authUser => {
			authUser.user.updateProfile({
				displayName: username
			});
			return userRef(authUser.user.uid).set({
				username,
				role,
				
			});
		})
		.then(() => {
			setUser({...INITIAL_STATE});
			history.push('/');
		})
		.catch(error => {
			setError(error);
			console.log(error.message);
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
	placeholer='Username'
	maxLength={16}
	/>
	<label>
	<input
	name='role'
	value='drummer'
	onChange={onChange}
	type='radio'
	checked={role === 'drummer'}
	/>
	Drummer
	</label>
	<label>
	<input
	name='role'
	value='singer'
	onChange={onChange}
	type='radio'
	checked={role === 'singer'}
	/>
	Singer
	</label>
	<label>
	<input
	name='role'
	value='guitar'
	onChange={onChange}
	type='radio'
	checked={role === 'guitar'}
	/>
	Guitar
	</label>
	<label>
	<input
	name='role'
	value='bass'
	onChange={onChange}
	type='radio'
	checked={role === 'bass'}
	/>
	Bass guitar
	</label>
	<label>
	<input
	name='role'
	value='piano'
	onChange={onChange}
	type='radio'
	checked={role === 'piano'}
	/>
	Piano
	</label>
	<input
	name='email'
	value={email}
	onChange={onChange}
	type='email'
	required
	placeholer='Email Address'
	/>
	<input
	name='passwordOne'
	value={passwordOne}
	onChange={onChange}
	type='password'
	placeholer='Password'
	/>
	<input
	name='passwordTwo'
	value={passwordTwo}
	onChange={onChange}
	type='password'
	placeholer='Confirm Password'
	/>
	<button disabled={isInvalid} type='submit'>Sign Up</button>
	{error && <p>{error.message} Try again later.</p>}
	</form>
	);
}

export default SignUp;