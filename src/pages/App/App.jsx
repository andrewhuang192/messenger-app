import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
// import { getUsers } from '../../utilities/users-api';
import * as usersAPI from '../../utilities/users-api';

import AuthPage from '../AuthPage/AuthPage';
import EditUserPage from '../EditUserPage/EditUserPage';
import MessagePage from '../MessagePage/MessagePage';
import NavBar from '../../Components/NavBar/NavBar';

import './App.css';

export default function App() {
	const [user, setUser] = useState(getUser());
	const [users, setUsers] = useState(getUser());
	console.log(users)
	console.log(user)

	// useEffect(function () {
	// 	async function getUsers() {
	// 	  const users = await usersAPI.getUsers();
	// 	//   console.log(users);
	// 	  setUsers={users}
	// 	}
	// 	//   setMenuItems(items);
	// 	//   setActiveUser(users[0].user.name);
	// 	getUsers();
	// }, []);

	async function handleUpdatedUser(updatedUserData) {
		console.log('working above')
		const updatedUser = await usersAPI.update(updatedUserData);
		console.log('working below')
		// console.log (user);
		console.log(updatedUser);
		const updatedUsersArray = users.map(p =>
			p._id === updatedUser._id ? updatedUser : p
		);
		setUsers(updatedUsersArray);
	}

	return (
		<main className='App'>
			{user ? (
				<>
					<NavBar user={user} setUser={setUser} />
					<Switch>
						<Route path='/orders/new'>
							<EditUserPage user={user} handleUpdatedUser={handleUpdatedUser} />
						</Route>
						<Route path='/orders'>
							<MessagePage user={user} users={users} />
						</Route>
						<Redirect to='/orders' />
					</Switch>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
}
