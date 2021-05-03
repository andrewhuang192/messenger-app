import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';

import './AuthPage.css';

export default function AuthPage({ setUser }) {
	const [showLogin, setShowLogin] = useState(true);

	return (
		<main>
			<h1>AuthPage</h1>
			{showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
			<div>
				<Link to='/' onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Create an Account' : 'Already have an account?'}</Link>
			</div>
			<Link to='/reset'>Reset Password</Link>
			{/* &nbsp; | &nbsp; */}
		</main>
	);
}
