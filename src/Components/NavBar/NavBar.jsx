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
			<Link to='/orders' className="messageslink">Messages</Link>
			&nbsp; | &nbsp;
			<Link to={{pathname:'/orders/new', state: {user}, className: "messageslink"}}>Profile</Link>
			&nbsp; | &nbsp;
			<span className="messageslink">{user.name}</span>
			&nbsp; | &nbsp;
			<Link to='/forgotpassword' className="messageslink">Reset Password</Link>
			&nbsp; | &nbsp;
			<Link to='' onClick={handleLogOut} className="messageslink" >
				Log Out
			</Link>
		</nav>
	);
}
