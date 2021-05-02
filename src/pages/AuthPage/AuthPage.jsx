import React from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
	return (
		<main>
			<h1>AuthPage</h1>
			<SignUpForm setUser={setUser} />
			<LoginForm setUser={setUser} />
			<Link to='/reset'>Reset Password</Link>
			{/* &nbsp; | &nbsp; */}
		</main>
	);
}
