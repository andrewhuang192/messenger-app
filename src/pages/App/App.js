import { useState, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
// import { getAllUsers } from '../../utilities/users-api';
import * as usersAPI from '../../utilities/users-api';
import * as messagesAPI from '../../utilities/messages-api';

import AuthPage from '../AuthPage/AuthPage';
import EditUserPage from '../EditUserPage/EditUserPage';
import MessagePage from '../MessagePage/MessagePage';
import NavBar from '../../Components/NavBar/NavBar';

import './App.css';

export default function App() {
	const [user, setUser] = useState(getUser());
	const [users, setUsers] = useState([]);
	const [messages, setMessages] = useState([]);

	// get our connection to the socket.io server
	// var socket = io();
	// console.log(socket)
	
	useEffect(() => {
		async function getUsers() {
			const users = await usersAPI.getAllUsers();
			//users.sort((a,b) => (a.name > b.name) ? 1 : -1)
			setUsers(users);
		}
		getUsers();
	}, []);

	async function handleUpdatedUser(updatedUserData) {
		const updatedUser = await usersAPI.update(updatedUserData);
		console.log('working below user-api fetch')
		// console.log (user);
		const updatedUsersArray = users.map(p =>
			p._id === updatedUser._id ? updatedUser : p
			);
			setUsers(updatedUsersArray);
	}
	// console.log('updated Users:', users);

	async function handleAddMessage(newMessageData) {
		console.log(newMessageData);
		const newMessage = await messagesAPI.create(newMessageData);
		setMessages([...messages, newMessage]);
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
							<MessagePage user={user} users={users} handleAddMessage={handleAddMessage} />
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
