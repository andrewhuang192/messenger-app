import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
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

	const history = useHistory();

	useEffect(() => {
		// This is listening for each time puppies state is changed,
		// then will run our function below to reroute
		history.push("/");
	}, [users, history]);

	useEffect(() => {
		// This is listening for each time puppies state is changed,
		// then will run our function below to reroute
		history.push("/");
	}, [messages, history]);


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
		// console.log('working below user-api fetch')
		// console.log(updatedUserData)
		// console.log(updatedUser)
		// console.log(users)
		// console.log (user);
		const updatedUsersArray = users.map(p =>
			p._id === updatedUser._id ? updatedUser : p
			);
			// console.log(updatedUsersArray)
			setUsers(updatedUsersArray);
			setUser(updatedUser)
		}
		// console.log('updated Users:', users);
		// console.log(users)

	async function handleAddMessage(newMessageData) {
		// console.log(newMessageData);
		const newMessage = await messagesAPI.create(newMessageData);
		setMessages([...messages, newMessage]);
	}
		
	async function handleDeleteMessage(id) {
		await messagesAPI.deleteOne(id);
		setMessages(messages.filter(p => p._id !== id));
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
							<MessagePage user={user} users={users} handleAddMessage={handleAddMessage} handleDeleteMessage={handleDeleteMessage}  />
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
