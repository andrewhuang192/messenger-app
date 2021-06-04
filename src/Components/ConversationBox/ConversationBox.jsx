import './ConversationBox.css';
import MessageItem from '../MessageItem/MessageItem';
import React, { useRef, useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
import { Paper, TextField, Button, makeStyles} from "@material-ui/core";
// import { getUsers } from '../../utilities/users-service';
import * as messagesAPI from "../../utilities/messages-api";
import useChatRoom from "../../useChatRoom.js";
import clsx from "clsx";

export default function ConversationBox({ 
    messageItems, 
    messages,
    activeConversation,
    handleDeleteMessage, 
    handleUpdateMessage
}) {
    const useStyles = makeStyles({
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
      });
  const classes = useStyles();
  const messageRef = useRef();
  const conversationsRef = useRef([]);
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = (e) => {
    console.log(e.target.value);
    setShowMessage(true);
  };

  

    return (
    <main className="ConversationBox">
         {messageItems
                .filter(
                  (message) => message.conversation === activeConversation
                )
                .map((message, i) => (
                  <li
                    key={message._id}
                    className={clsx(
                      classes.message,
                      message.isOwner ? classes.owner : classes.guest
                    )}
                  >
                    <span>
                      {message.message}
                      <Button
                        variant="light"
                        onClick={() => handleDeleteMessage(message._id)}
                      >
                        DELETE
                      </Button>
                      <Button
                        className="btn btn-s btn-warning"
                        onClick={handleShowMessage}
                      >
                        EDIT
                      </Button>
                      {showMessage ? (

                      <form showMessage={showMessage}>
                        <TextField placeholder={message.message} />
                        <Button onClick={handleCloseMessage}>Update</Button>
                      </form>
                      
                      ):(
                        ""
                      )}
                    </span>
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
                  <span>
                  {message.message}
                      <Button
                        variant="light"
                        onClick={() => handleDeleteMessage(message._id)}
                      >
                        DELETE
                      </Button>
                      <Button
                        className="btn btn-s btn-warning"
                        onClick={handleShowMessage}
                      >
                        EDIT
                      </Button>
                      {showMessage ? (

                      <form showMessage={showMessage}>
                        <TextField>{message.message}</TextField>
                        <Button onClick={handleCloseMessage}>Update</Button>
                      </form>
                      
                      ):(
                        ""
                      )}
                  </span>
                </li>
              ))}
    </main>
  );
}