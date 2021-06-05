import "./MessageBox.css";
// import MessageItem from '../MessageItem/MessageItem';
import React, { useRef, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button, makeStyles } from "@material-ui/core";
// import { getUsers } from '../../utilities/users-service';
// import * as messagesAPI from "../../utilities/messages-api";
// import useChatRoom from "../../useChatRoom.js";
import clsx from "clsx";
import EditMessageForm from "../EditMessageForm/EditMessageForm";
import EditMessagePage from "../../pages/EditMessagePage/EditMessagePage";

export default function MessageBox({
  messageItems,
  messages,
  setMessageItems,
  activeConversation,
  handleDeleteMessage,
  handleUpdateMessage,
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
  // const messageRef = useRef();
  // const conversationsRef = useRef([]);
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = (e) => {
    // console.log(e.target.value);
    setShowMessage(true);
  };
  const [showLikes, setShowLikes] = useState(false);
  const handleCloseLikes = () => setShowLikes(false);
  const handleShowLikes = (e) => {
    // console.log(e.target.value);
    setShowLikes(true);
  };

  return (
    <main className="MessageBox">
      {messageItems
        .filter((message) => message.conversation === activeConversation)
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
                onClick={handleShowLikes}
                value={message.id}
              >
                <svg
                  aria-label="More options"
                  className="_8-yf5 "
                  fillRule="#262626"
                  height="16"
                  viewBox="0 0 48 48"
                  width="16"
                >
                  <circle
                    clipRule="evenodd"
                    cx="8"
                    cy="24"
                    fillRule="evenodd"
                    r="4.5"
                  ></circle>
                  <circle
                    clipRule="evenodd"
                    cx="24"
                    cy="24"
                    fillRule="evenodd"
                    r="4.5"
                  ></circle>
                  <circle
                    clipRule="evenodd"
                    cx="40"
                    cy="24"
                    fillRule="evenodd"
                    r="4.5"
                  ></circle>
                </svg>
              </Button>
              {showLikes ? (
                <>
                  <Button
                    variant="light"
                    onClick={() => handleDeleteMessage(message._id)}
                  >
                    DELETE
                  </Button>
                  
                  <Link
                    to={{
                      pathname: '/edit',
                      state: { message },
                    }}
                    className="btn btn-s btn-warning"
                    // onClick={handleShowMessage}
                  >
                    EDIT
                  </Link>
                  {/* {showMessage ? (
                  <EditMessagePage message={message} message_id={message._id} handleUpdateMessage={handleUpdateMessage} setMessageItems={setMessageItems} />
                  ) : (
                    ""
                  )} */}
                </>
              ) : (
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
                onClick={handleShowLikes}
                value={message.id}
              >
                <svg
                  aria-label="More options"
                  className="_8-yf5 "
                  fillRule="#262626"
                  height="16"
                  viewBox="0 0 48 48"
                  width="16"
                >
                  <circle
                    clipRule="evenodd"
                    cx="8"
                    cy="24"
                    fillRule="evenodd"
                    r="4.5"
                  ></circle>
                  <circle
                    clipRule="evenodd"
                    cx="24"
                    cy="24"
                    fillRule="evenodd"
                    r="4.5"
                  ></circle>
                  <circle
                    clipRule="evenodd"
                    cx="40"
                    cy="24"
                    fillRule="evenodd"
                    r="4.5"
                  ></circle>
                </svg>
              </Button>
              {showLikes ? (
                <>
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
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
          </span>
        </li>
      ))}
    </main>
  );
}
