import React from 'react';
import { Link } from 'react-router-dom';
import './UserListItem.css';

function UserListItem({ user }) {
    // console.log(user)
	return (
		<div className='panel panel-default'>
			<div className='panel-heading'>
				<Link className='panel-title'>{user.name}</Link>
			</div>	
        </div>
	);
}

export default UserListItem;