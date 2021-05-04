import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
	function handleLogOut() {
		// Delegate to the users-service
		userService.logOut();
		// Update state will also cause a re-render
		setUser(null);
	}

	return (
		<nav>
			<Link to='/orders'>Messages</Link>
			&nbsp; | &nbsp;
			<Link to='/orders/new'>Profile</Link>
			&nbsp; | &nbsp;
			<span>{user.name}</span>
			&nbsp; | &nbsp;
			<Link to='/forgotpassword'>Reset Password</Link>
			&nbsp; | &nbsp;
			<Link to='' onClick={handleLogOut}>
				Log Out
			</Link>
		</nav>
	);
}
