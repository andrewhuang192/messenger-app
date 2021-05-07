import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import { getAllUsers } from '../../utilities/users-api';
// import { getAllUsers } from '../../utilities/users-api';
import * as usersAPI from '../../utilities/users-api';
import * as messagesAPI from '../../utilities/messages-api';

import AuthPage from '../AuthPage/AuthPage';
import EditUserPage from '../EditUserPage/EditUserPage';
import MessagePage from '../MessagePage/MessagePage';
import EditMessagePage from '../EditMessagePage/EditMessagePage';
import NavBar from '../../Components/NavBar/NavBar';

import './App.css';

export default function App() {
	const [user, setUser] = useState(getUser());
	const [users, setUsers] = useState([]);
	const [messages, setMessages] = useState([]);
	const [updatePage, setUpdatePage] = useState([]);
	const history = useHistory();
	console.log(user)
	console.log(users)

	useEffect(() => {
		// This is listening for each time puppies state is changed,
		// then will run our function below to reroute
		history.push("/orders");
	}, [users, history]);

	useEffect(() => {
		// This is listening for each time puppies state is changed,
		// then will run our function below to reroute
		history.push("/");
	}, [updatePage, history]);

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
		// console.log(updatedUserData)
		//the usersAPI below should return users
		const updatedUser = await usersAPI.update(updatedUserData);
		// console.log('working below user-api fetch')
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
		setUpdatePage(messages)
	}

	async function handleUpdateMessage(updatedMessageData) {
		console.log(updatedMessageData)
		const updatedMessage = await messagesAPI.update(updatedMessageData);
		// console.log('working below Message-api fetch')
		console.log(updatedMessage)
		console.log(messages)
		console.log (user);
		const updatedMessagesArray = messages.map(p =>
			p._id === updatedMessage._id ? updatedMessage : p
			);
			// console.log(updatedMessagesArray)
			setMessages(updatedMessagesArray);
			// setMessage(updatedMessage)
		}
	
		return (
			<main className='App'>
			{user ? (
				<>
					<NavBar user={user} setUser={setUser} />
					<Switch>
						<Route path='/orders/new'>
							<EditUserPage  user={user} users={users} handleUpdatedUser={handleUpdatedUser} />
						</Route>
						<Route path='/orders'>
							<MessagePage user={user} users={users} handleAddMessage={handleAddMessage} handleDeleteMessage={handleDeleteMessage} handleUpdateMessage={handleUpdateMessage} />
						</Route>
						<Route path='/editConversation'>
							<EditMessagePage handleUpdateMessage={handleUpdateMessage} />
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
