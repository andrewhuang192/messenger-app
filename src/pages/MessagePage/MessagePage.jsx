import React, { useRef, useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import { Paper, TextField, Button, makeStyles } from "@material-ui/core";
// import { getUsers } from '../../utilities/users-service';
import * as messagesAPI from "../../utilities/messages-api";
import * as conversationsAPI from "../../utilities/conversations-api";
// import * as usersService from "../../utilities/users-service";
import ConversationList from "../../Components/ConversationList/ConversationList";
import ConversationBox from "../../Components/ConversationBox/ConversationBox";

import useChatRoom from "../../useChatRoom.js";
import clsx from "clsx";

import "./MessagePage.css";

export default function MessagePage({
  user,
  users,
  handleAddMessage,
  handleDeleteMessage,
  handleUpdateMessage,
}) {
  const useStyles = makeStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "90%",
      backgroundColor: "#263238",
      borderColor: "white",
    },
    paper: {
      width: "90%",
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
      backgroundColor: "white",
      borderColor: "white",
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
  const [conversationItems, setConversationItems] = useState([]);

  const [activeConversation, setActiveConversation] = useState("");
  const [messageItems, setMessageItems] = useState([]);
  // const [inputBox, setInputBox] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const classes = useStyles();
  const messageRef = useRef();
  const conversationsRef = useRef([]);

  const { messages, sendMessage, incomingMessageToAdd } =
    useChatRoom(activeConversation);

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

  useEffect(function () {
    async function getConversations() {
      const conversations = await conversationsAPI.getAllConversations();
      setConversationItems(conversations);
      // setActiveConversation(conversations[0]);
      // setMessageItems(conversations.filter((message) => message.conversation === activeConversation));
    }
    getConversations();
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
      // console.log(messages)
      setNewMessage("");
    }
  };

  //   async function handleCheckToken() {
  //     usersService.checkToken();
  //   }

  // console.log(conversationItems);
  // console.log(messages);
  return (
    <main className="MessagePage">
      <aside>
        {/* <button onClick={handleCheckToken}>Check When My Login Expires</button> */}
        <h4>Conversations</h4>

        <ConversationList
          user={user}
          users={users}
          conversations={conversationsRef.current}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
        />
      </aside>

      <form autoComplete="off" onSubmit={handleSubmit}>
        {conversationItems.map((conversation) => (
          <>
            {conversation._id === activeConversation ? (
              <>
                <h2>
                  Messages with &nbsp;&nbsp;
                  {users.map((user) => (
                    <>{user._id === conversation.user1 ? user.name : ""}</>
                  ))}
                  &nbsp;&nbsp;and&nbsp;&nbsp;
                  {users.map((user) => (
                    <>{user._id === conversation.user2 ? user.name : ""}</>
                  ))}
                </h2>
              </>
            ) : (
              ""
            )}
          </>
        ))}
        {/* <div className={classes.container}> */}
        <Paper elevation={5} className={classes.paper}>
          <div className={classes.messageContainer}>
            <ol className={classes.ol}>
              <ConversationBox
                messageItems={messageItems}
                messages={messages}
                activeConversation={activeConversation}
                handleDeleteMessage={handleDeleteMessage}
                handleUpdateMessage={handleUpdateMessage}
              />
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
