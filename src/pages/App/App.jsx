import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { getAll } from '../../utilities/users-api';
import * as usersAPI from '../../utilities/users-api';

import AuthPage from '../AuthPage/AuthPage';
import EditUserPage from '../EditUserPage/EditUserPage';
import MessagePage from '../MessagePage/MessagePage';
import NavBar from '../../Components/NavBar/NavBar';

import './App.css';

export default function App() {
	const [user, setUser] = useState(getUser());
	const [users, setUsers] = useState([]);
	// users.then(function(result) {
	// 	let users = result;
	// 	console.log(result);
	// 	return users;
	// })
	// const users = await getUsers();
	// console.log(users)
	
	useEffect(() => {
		async function getUsers() {
			const users = await usersAPI.getAll();
			//users.sort((a,b) => (a.name > b.name) ? 1 : -1)
			setUsers(users);
		}
		getUsers();
	}, []);

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
