import React from 'react';
import {useState} from 'react';

import './ForgotPassword.css';

export default function ForgotPassword() {
	const [resetPasswordCredentials, setResetPasswordCredentials] = useState({
		email: '',
	});
	const [error, setError] = useState('');
	
	function handleChange(evt) {
		setResetPasswordCredentials({ ...resetPasswordCredentials, [evt.target.name]: evt.target.value });
		setError('');
	}

	async function handleSubmit(evt) {
		// Prevent form from being submitted to the server
		evt.preventDefault();
		try {
			// The promise returned by the passwordReset service method
			// will resolve to the user object included in the payload 
			// const user = await usersService.passwordReset(resetPasswordCredentials);
			// setUser(user);
			console.log(resetPasswordCredentials)
		} catch {
			setError('Log In Failed - Try Again');
		}
	}

	return (
		<main>
			<div className='form-container' onSubmit={handleSubmit} >
				<form autoComplete='off'>
					<label>Email</label>
					<input
						type='text'
						name='email'
						value={resetPasswordCredentials.email}
						onChange={handleChange}
						required
					/>
					<button type='submit'>Send Password Reset Email</button>
				</form>
			</div>

		
		</main>
	);
}
