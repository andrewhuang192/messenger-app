import "./MessageItem.css";
// import {makeStyles} from "@material-ui/core";
// import React, {useRef, useEffect} from "react";
// import message from "../../../models/message";
// import clsx from "clsx";

export default function MessageItem({ messageItem, handleDeleteMessage }) {

  

//   const classes = useStyles();
	// const messageRef = useRef()
  // console.log(messageItem)

  // useEffect(() => messageRef.current.scrollIntoView({behavior: "smooth"}))

  return (
      <div className="messageItem">
        <div>
          
            <div className="name">{messageItem.sender}</div>
            {/* <div className="timestamp">{messageItem.createdAt}</div> */}
            </div>
            <div>
            {/* <div className="textmessage">{messageItem.conversation}</div> */}
            <div className="textmessage">{messageItem.message}</div>
            <button
                    className='btn btn-xs btn-danger margin-left-10'
                    onClick={() => handleDeleteMessage(messageItem._id)}
                    >
                    DELETE
            </button>
        </div>
      </div>
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


                  