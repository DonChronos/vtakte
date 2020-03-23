import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doSignIn } from '../Firebase';

const INITIAL_STATE = {
		email: '',
		password: '',
	}


const SignIn = () => {
	const [user, setUser] = useState({...INITIAL_STATE});
	const [error, setError] = useState(null);
	let { email, password } = user;
	let history = useHistory();
	const onSubmit = event => {
		doSignIn(email, password)
		.then(() => {
			setUser({...INITIAL_STATE});
			history.push('/');
		})
		.catch(error => {
			setError(error);
			console.log(error.message);
		});
		// on success should have history pushed to home via withRouter
		event.preventDefault();
	}
	const onChange = event => {
		let target = event.target;
		setUser(state => ({...state, [target.name]: target.value}));
	}
	const isInvalid = password === '' || email === '';
//  add proper validation with regex
	
	return (
	<form onSubmit={onSubmit}>
	<input
	name='email'
	value={email}
	onChange={onChange}
	type='text'
	placeholer='Email Address'
	/>
	<input
	name='password'
	value={password}
	onChange={onChange}
	type='password'
	placeholer='Password'
	/>
	<button disabled={isInvalid} type='submit'>Sign In</button>
	{error && <p>{error.message} Try again later.</p>}
	</form>
	);
}

export default SignIn;