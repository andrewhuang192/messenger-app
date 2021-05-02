import React from 'react';
import { useState, useRef } from "react";
// import { getUsers } from '../../utilities/users-service';
// import * as messagesAPI from '../../utilities/messages-api';
import * as usersService from '../../utilities/users-service';
import UserList from '../../Components/UserList/UserList';
import ConversationBox from '../../Components/ConversationBox/ConversationBox';


export default function MessagePage({user, users}) {
	const [activeConversation, setActiveConversation] = useState("");
	// eslint-disable-next-line
	const [messageItems, setMessageItems] = useState([]);
	const [inputBox, setInputBox] = useState("");
	// console.log(users)
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

	// useEffect(function () {
	// 	async function getMessages() {
	// 	  const messages = await messagesAPI.getMessages();
	// 	//   console.log(users);
	// 	  setMessageItems(messages);
	// 	  }
	// 	//   setMenuItems(items);
	// 	//   setActiveUser(users[0].user.name);
	// 	getMessages();
	// }, []);


	return (
		<main className="MessagePage">
	
		  <aside>
		  	<button onClick={handleCheckToken}>
				Check When My Login Expires
			</button>
			<UserList
				users={users}
				activeConversation={activeConversation}
				setActiveConversation={setActiveConversation}
			/>
			</aside>
			<form autoComplete='off' onSubmit={handleSubmit}>
						<ConversationBox
							user={user}
							messageItems={messageItems.filter((message) => message.user._id === activeConversation)}
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
						<button type='submit' >
							SEND
						</button>
						<script src="/socket.io/socket.io.js"></script>
    					<script src="/javascripts/app.js"></script>
			</form>
			
    	</main>
	)
};
