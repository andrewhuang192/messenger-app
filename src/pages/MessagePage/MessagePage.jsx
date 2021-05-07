import React, { useRef, useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import { Paper, TextField, Button, makeStyles } from "@material-ui/core";
// import { getUsers } from '../../utilities/users-service';
import * as messagesAPI from "../../utilities/messages-api";
// import * as usersService from "../../utilities/users-service";
import ConversationList from "../../Components/ConversationList/ConversationList";
import ConversationBox from "../../Components/ConversationBox/ConversationBox";

import useChatRoom from "../../useChatRoom.js";
import clsx from "clsx";

import "./MessagePage.css";

export default function MessagePage({ user, users, handleAddMessage, handleDeleteMessage, handleUpdateMessage }) {

  const useStyles = makeStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
      backgroundColor: "#263238",
    },
    paper: {
      width: "50em",
      height: "80%",
      position: "relative",
    },
    action: {
      display: "flex",
      width: "96%",
      alignItems: "center",
      margin: "1em",
      position: "absolute",
      bottom: 0,
    },
    sendButton: {
      width: "10em",
      height: "50%",
      margin: "0 2em",
    },
    messageInput: {
      width: "100%",
    },
    messageContainer: {
      overflowY: "auto",
      height: "85%",
    },
    divider: {
      margin: "0.1em",
    },
    message: {
      listStyle: "none",
    },
    owner: {
      margin: "1em",
      backgroundColor: "#0091EA",
      padding: "0.5em 1.5em",
      borderRadius: "20px",
      color: "#FFF",
      wordBreak: "break-word",
      maxWidth: "65%",
      width: "fit-content",
      marginRight: "auto",
    },
    guest: {
      margin: "1em",
      backgroundColor: "#8BC34A",
      padding: "0.5em 1.5em",
      borderRadius: "20px",
      color: "#FFF",
      wordBreak: "break-word",
      maxWidth: "65%",
      width: "fit-content",
      marginLeft: "auto",
    },
    ol: {
      paddingInlineEnd: "40px",
    },
  });

  // eslint-disable-next-line
  const [activeConversation, setActiveConversation] = useState("");
  const [messageItems, setMessageItems] = useState([]);
  // const [inputBox, setInputBox] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const classes = useStyles();
  const messageRef = useRef();
  const conversationsRef = useRef([]);

  const { messages, sendMessage, incomingMessageToAdd } = useChatRoom(activeConversation);

  //Fetches all messages (messagesAPI.getAllMessages) and then use conversationsRef.current to match two users to find Active Conversation
  useEffect(function () {
	  async function getMessages() {
		  const messages = await messagesAPI.getAllMessages();
		  conversationsRef.current = messages.reduce((convos, message) => {
			  const convo = message.conversation;
			  return convos.includes(convo) ? convos : [...convos, convo];
			}, []);
			setMessageItems(messages);
			setActiveConversation(messages[0].conversation);
			// setMessageItems(messages.filter((message) => message.conversation === activeConversation));
    }
    getMessages();
  }, []);

  /**-- Helper Functions for ConversationBox --**/

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      if (newMessage !== "") {
        sendMessage(newMessage);
        setNewMessage("");
      }
    }
  };

  useEffect(() => messageRef.current.scrollIntoView({ behavior: "smooth" }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      sendMessage(newMessage);
      handleAddMessage(incomingMessageToAdd);
      setNewMessage("");
    }
  };

//   async function handleDeleteMessage(id) {
//     await messagesAPI.deleteOne(id);
//     setMessageItems(messages.filter((p) => p._id !== id));
//   }

//   async function handleCheckToken() {
//     usersService.checkToken();
//   }

  return (
    <main className="MessagePage">
      <aside>
        {/* <button onClick={handleCheckToken}>Check When My Login Expires</button> */}
        <h4>Conversations</h4>
        <ConversationList
          conversations={conversationsRef.current}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
		  />
      <ConversationBox
        handleDeleteMessage={handleDeleteMessage}
		handleUpdateMessage={handleUpdateMessage}
        user={user}
        messageItems={messageItems.filter(
          (message) => message.conversation === activeConversation
        )}
      />
      </aside>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <h2>Messages with {activeConversation}</h2>
        <h4>Last Seen: </h4>
        {/* <div className={classes.container}> */}
          <Paper elevation={5} className={classes.paper}>
            <div className={classes.messageContainer}>
              <ol className={classes.ol}>
			  
			  {messageItems.filter((message) => message.conversation === activeConversation).map((message, i)  => (
               
                  <li
                    key={message._id}
                    className={clsx(
                      classes.message,
                      message.isOwner ? classes.owner : classes.guest
                    )}
                  >
                    <span>{message.message}</span>
                 
                  </li>
                ))}

                {messages.map((message, i) => (
                 
                  <li
                    key={message._id}
                    className={clsx(
                      classes.message,
                      message.isOwner ? classes.owner : classes.guest
                    )}
                  >
                    <span>{message.message}</span>
                    
                  </li>
                ))}
              </ol>
              <div ref={messageRef}></div>
            </div>
            <div className={classes.action}>
              <TextField
                className={classes.messageInput}
                id="message"
                label="Message"
                placeholder="enter message here"
                variant="outlined"
                value={newMessage}
                onChange={handleNewMessageChange}
                onKeyUp={handleKeyUp}
              />
              <Button
                disabled={!newMessage}
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.sendButton}
              >
                Send
              </Button>
            </div>
          </Paper>
        {/* </div> */}
      </form>
    </main>
  );
}
