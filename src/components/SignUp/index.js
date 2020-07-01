import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doSignUp, userRef } from '../Firebase';
import * as roles from '../Roles';
import styled from 'styled-components';

const Form = styled.form`
position: relative;
`
const Label = styled.label`
position: absolute;
left: 50%;
transform: translate(-50%, 0);
`
const Input = styled.input`
position: absolute;
left: 50%;
transform: translate(-50%, 0);
`
const Button = styled.button`
position: absolute;
left: 50%;
transform: translate(-50%, 0);
top: 390px;
`

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
	<Form onSubmit={onSubmit}>
	<Input
	name='username'
	value={username}
	onChange={onChange}
	type='text'
	placeholder='Username'
	maxLength={16}
	/>
	<Label style={{display: 'inline-block', top: '20px'}}>
	<input
	name='role'
	value='drummer'
	onChange={onChange}
	type='radio'
	checked={role === 'drummer'}
	/>
	<roles.Drummer />
	</Label>
	<Label style={{display: 'inline-block', top: '80px'}}>
	<input
	name='role'
	value='singer'
	onChange={onChange}
	type='radio'
	checked={role === 'singer'}
	/>
	<roles.Singer />
	</Label>
	<Label style={{display: 'inline-block', top: '140px'}}>
	<input
	name='role'
	value='guitar'
	onChange={onChange}
	type='radio'
	checked={role === 'guitar'}
	/>
	<roles.Guitar />
	</Label>
	<Label style={{display: 'inline-block', top: '200px'}}>
	<input
	name='role'
	value='bass'
	onChange={onChange}
	type='radio'
	checked={role === 'bass'}
	/>
	<roles.Bass_Guitar />
	</Label>
	<Label style={{display: 'inline-block', top: '260px'}}>
	<input
	name='role'
	value='piano'
	onChange={onChange}
	type='radio'
	checked={role === 'piano'}
	/>
	<roles.Piano />
	</Label>
	<Input
	name='email'
	value={email}
	onChange={onChange}
	type='email'
	required
	placeholder='Email Address'
	style={{top: '330px'}}
	/>
	<Input
	name='passwordOne'
	value={passwordOne}
	onChange={onChange}
	type='password'
	placeholder='Password'
	style={{top: '350px'}}
	/>
	<Input
	name='passwordTwo'
	value={passwordTwo}
	onChange={onChange}
	type='password'
	placeholder='Confirm Password'
	style={{top: '370px'}}
	/>
	<Button disabled={isInvalid} type='submit'>Sign Up</Button>
	{error && <p>{error.message} Try again later.</p>}
	</Form>
	);
}

export default SignUp;
