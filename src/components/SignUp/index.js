import React, { useState } from 'react';
import { doSignUp } from '../Firebase';

const INITIAL_STATE = {
		username: '',
		email: '',
		passwordOne: '',
		passwordTwo: '',
	}

const SignUp = props => {
	const [user, setUser] = useState({...INITIAL_STATE});
	const [error, setError] = useState(null);
	let {username, email, passwordOne, passwordTwo} = user;
	console.log(user);
	console.log(error);
	const onSubmit = event => {
		doSignUp(email, passwordOne)
		.catch(error => {
			setError(error);
			console.log(error.message);
		})
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
	
	return (
	<form onSubmit={onSubmit}>
	<input
	name='username'
	value={username}
	onChange={onChange}
	type='text'
	placeholer='Username'
	/>
	<input
	name='email'
	value={email}
	onChange={onChange}
	type='text'
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
	{error && <p>{error.message}</p>}
	</form>
	);
}

export default SignUp;