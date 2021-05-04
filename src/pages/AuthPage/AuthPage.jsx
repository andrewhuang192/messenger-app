import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';

import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import LoginForm from '../../Components/LoginForm/LoginForm';
import ForgotPassword from '../../Components/ForgotPassword/ForgotPassword';

import './AuthPage.css';

export default function AuthPage({ setUser }) {
	const [showLogin, setShowLogin] = useState(true);
	// const [showForgotPassword, setShowForgotPassword] = useState()

	return (
		<main>
			<h1>AuthPage</h1>
			<div><ForgotPassword /></div>
			{showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
			<div>
				<Link to='/' onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Create an Account' : 'Already have an account?'}</Link>
			</div>
			{/* &nbsp; | &nbsp; */}
		</main>
	);
}
