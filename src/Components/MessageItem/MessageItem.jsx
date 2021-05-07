import "./MessageItem.css";
// import {makeStyles} from "@material-ui/core";
// import React, {useRef, useEffect} from "react";
// import message from "../../../models/message";
// import clsx from "clsx";
// import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

export default function MessageItem({
  messageItem,
  handleDeleteMessage,
  handleUpdateMessage,
}) {
  // const classes = useStyles();
  // const messageRef = useRef()
  // useEffect(() => messageRef.current.scrollIntoView({behavior: "smooth"}))
  
//   const history = useHistory();
//   console.log(messageItem)
//     useEffect(() => {
// 		// This is listening for each time messageItem state is changed,
// 		// then will run our function below to reroute
// 		history.push("/");
// 	}, [messageItem, history]);

  return (
    <div className="messageItem">
		  <div className="textmessage">{messageItem.message}</div>
      <div>
        <div className="name">{messageItem.sender}</div>
        <button
          className="btn btn-xs btn-danger margin-left-10"
          onClick={() => handleUpdateMessage(messageItem._id)}
        >
          EDIT
        </button>
        <button
          className="btn btn-xs btn-danger margin-left-10"
          onClick={() => handleDeleteMessage(messageItem._id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}
