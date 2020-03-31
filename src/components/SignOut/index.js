import React from 'react';
import { useHistory } from 'react-router-dom';
import { doSignOut } from '../Firebase';
import Button from '../Button';

const SignOut = () => {
  let history = useHistory();
  const handleClick = () => doSignOut().then(history.push('/'));
  return (
<Button onClick={handleClick}>LogOut</Button>
);
}

export default SignOut;