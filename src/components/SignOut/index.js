import React from 'react';
import { useHistory } from 'react-router-dom';
import { doSignOut } from '../Firebase';

// on sign out push history to home
const SignOut = () => {
  let history = useHistory();
  const handleClick = () => doSignOut().then(history.push('/'));
  return (
<button onClick={handleClick}>Sign Out</button>
);
}

export default SignOut;