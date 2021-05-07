import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import { makeStyles } from "@material-ui/core";

// import "src/Components/NavBar/NavBar.css";


export default function NavBar({ user, setUser }) {

	const useStyles = makeStyles({
		links: {
		  color: 'white',
		},
	});

	const classes = useStyles();

	function handleLogOut() {
		// Delegate to the users-service
		userService.logOut();
		// Update state will also cause a re-render
		setUser(null);
	}

	return (
		<nav className="ConversationList">
			<Link to='/orders' className={classes.links}>Messages</Link>
			&nbsp; | &nbsp;
			<Link to='/orders/new' className={classes.links}>Profile</Link>
			&nbsp; | &nbsp;
			<span className={classes.links}>{user.name}</span>
			&nbsp; | &nbsp;
			<Link to='/forgotpassword' className={classes.links}>Reset Password</Link>
			&nbsp; | &nbsp;
			<Link to='' onClick={handleLogOut} className={classes.links} >
				Log Out
			</Link>
		</nav>
	);
}
