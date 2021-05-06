import "./MessageItem.css";
import {makeStyles} from "@material-ui/core";
import React, {useRef, useEffect} from "react";
// import message from "../../../models/message";
// import clsx from "clsx";

export default function MessageItem({ messageItem, handleDeleteMessage }) {

  const useStyles = makeStyles({
		container: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			height: "50vh",
			backgroundColor: "#263238"
		},
		paper: {
			width: "25em",
			height: "80%",
			position: "relative"
		},
		action: {
			display: "flex",
			width: "96%",
			alignItems: "center",
			margin: "1em",
			position: "absolute",
			bottom: 0
		},
		sendButton: {
			width: "10em",
			height: "50%",
			margin: "0 2em"
		},
		messageInput: {
			width: "100%"
		},
		messageContainer: {
			overflowY: "auto",
			height: "85%"
		},
		divider: {
			margin: "0.1em"
		},
		message:{
			listStyle: "none"
		},
		owner:{
			margin: "1em",
			backgroundColor: "#0091EA",
			padding: "0.5em 1.5em",
			borderRadius: "20px",
			color: "#FFF",
			wordBreak: "break-word",
			maxWidth: "65%",
			width: "100%",
			marginRight: "auto"
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
			marginLeft: "auto"
		},
		ol: {
			paddingInlineEnd: "40px"
		}
	});

  // const classes = useStyles();
	// const messageRef = useRef()
  // console.log(messageItem)

  // useEffect(() => messageRef.current.scrollIntoView({behavior: "smooth"}))

  return (
      <tbody className="messageItem">
        <tr>
          
            <td className="name">{messageItem.sender}</td>
            <td className="timestamp">{messageItem.createdAt}</td>
            </tr>
            <tr>
            <td className="textmessage">{messageItem.conversation}</td>
            <td className="textmessage">{messageItem.message}</td>
            <button
                    className='btn btn-xs btn-danger margin-left-10'
                    onClick={() => handleDeleteMessage(messageItem._id)}
                    >
                    DELETE
            </button>
        </tr>
      </tbody>
      // <li       
			// 							key={messageItem._id}
			// 							className={clsx(classes.messageItem, messageItem.isOwner ? classes.owner : classes.guest)}
      //               >
			// 							<span>{messageItem.sender}</span>
			// 							<span>{messageItem.message}</span>
			// 							<span>{messageItem.createdAt}</span>
			// 							<span>{messageItem.conversation}</span>
			// 							<span>{messageItem.isOwner}</span>
			// </li>
  );
}


                  