import "./ConversationList.css";
// import UserListItem from '../UserListItem/UserListItem';
// import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';
// import { getUsers } from '../../utilities/users-service';
import * as conversationsAPI from "../../utilities/conversations-api";
import { TextField, Button} from "@material-ui/core";

export default function ConversationList({
  user,
  conversations,
  users,
  activeConversation,
  setActiveConversation,
}) {
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(false);
  const handleShowMessage = (e) => {
    console.log(e.target.value);
    setShowMessage(true);
  };
  const [conversationItems, setConversationItems] = useState([]);
  
  useEffect(function () {
    async function getConversations() {
      const conversations = await conversationsAPI.getAllConversations();
      setConversationItems(conversations);
      // setActiveConversation(conversations[0]);
      // setMessageItems(conversations.filter((message) => message.conversation === activeConversation));
    }
    getConversations();
  }, []);

  console.log(conversations);
  console.log(users);
  console.log(user._id);
  console.log(conversationItems);
  console.log(activeConversation);

  // const convos = conversations.map(convo =>
  //   <li
  //     key={convo}
  //     className={convo === activeConversation ? 'active' : ''}
  //     // FYI, the below will also work, but will give a warning
  //     onClick={() => setActiveConversation(convo)}
  //   >
  //     {convo}
  //       <Link
  //       className='btn btn-xs btn-warning'
  //       to={{
  //         pathname: '/editConversation',
  //         state: { convo },
  //       }}
  //     >
  //       EDIT
  //     </Link>
  //   </li>
  // );

  return (
    <ul className="ConversationList">
      {conversationItems.map((conversation) => (
        <>
        {conversation.user1===user._id || conversation.user2 === user._id ? (
          <li
            key={conversation._id}
            className={conversation._id === activeConversation ? "active" : ""}
            // FYI, the below will also work, but will give a warning
            onClick={() => setActiveConversation(conversation._id)}
          >
            <span>
           
              {users.map((user) => (
                <>
                {(user._id===conversation.user1) ? user.name : ("")}
                </>
              ))}
             &nbsp;&nbsp;and&nbsp;&nbsp;
              {users.map((user) => (
                <>
                {(user._id===conversation.user2) ? user.name : ("")}
                </>
              ))}
                      
                     
                      <Button
                        className="btn btn-s btn-warning"
                        onClick={handleShowMessage}
                      >
                        EDIT
                      </Button>
                      {showMessage ? (

                      <form showMessage={showMessage}>
                        <TextField placeholder={conversation.name}/>
                        <Button onClick={handleCloseMessage}>Update</Button>
                      </form>
                      
                      ):(
                        ""
                      )}
                    </span>
          </li>
        ) : ("")}
          
        </>
      ))}
    </ul>
  );
}
