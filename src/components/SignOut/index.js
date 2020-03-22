import React from 'react';
import { doSignOut } from '../Firebase';

const SignOut = () => (
<button onClick={doSignOut}>Sign Out</button>
);

export default SignOut;