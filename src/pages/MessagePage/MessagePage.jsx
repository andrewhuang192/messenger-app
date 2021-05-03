import React from 'react';
import { useState, useRef, useEffect } from "react";
// import { getUsers } from '../../utilities/users-service';
import * as messagesAPI from '../../utilities/messages-api';
import * as usersService from '../../utilities/users-service';
import UserList from '../../Components/UserList/UserList';
import ConversationBox from '../../Components/ConversationBox/ConversationBox';

import './MessagePage.css';

export default function MessagePage({user, users}) {
	const [activeConversation, setActiveConversation] = useState("");
	// eslint-disable-next-line
	const [messageItems, setMessageItems] = useState([]);
	const [inputBox, setInputBox] = useState("");
	
	const usersRef = useRef([]);

	const handleChange = (e) => {
		setInputBox({
		  ...inputBox,
		  [e.target.name]: e.target.value
		})
	  }

	  const handleSubmit = (e) => {
		e.preventDefault()
		// handleNewMessage(inputBox);
	  }

	async function handleCheckToken() {
		usersService.checkToken();
	}

	useEffect(function () {
		async function getMessages() {
		  const messages = await messagesAPI.getAllMessages();
		  usersRef.current = messages.reduce((convos, message) => {
			const convo = message.conversation._id;
			return convos.includes(convo) ? convos : [...convos, convo];
		  }, []);
		  setMessageItems(messages);
		  setActiveConversation(messages[0].conversation._id);
		  console.log(messages[0].conversation._id);
		}
		getMessages();
	}, []);

	return (
		<main className="MessagePage">

		  <aside>
		  	<button onClick={handleCheckToken}>
				Check When My Login Expires
			</button>
			<h4>Friends</h4>
			<UserList
				users={users}
				activeConversation={activeConversation}
				setActiveConversation={setActiveConversation}
				/>
			</aside>
			
			<form autoComplete='off' onSubmit={handleSubmit}>
						<h2>Conversation with {activeConversation}</h2>
						<ConversationBox
							user={user}
							messageItems={messageItems.filter((message) => message.conversation._id === activeConversation)}
						/>
						<ul id="messages"></ul>
						<label>Message:</label>
						<input
							type='text'
							name='name'
							// value={inputMessage}
							onChange={handleChange}
							required
						/>
						<button type='submit' className='btn btn-lg'>
							SEND
						</button>
						<script src="/socket.io/socket.io.js"></script>
    					<script src="/src/pages/App/App.js"></script>
			</form>
			
    	</main>
	)
};
