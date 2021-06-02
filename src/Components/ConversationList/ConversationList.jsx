import './ConversationList.css';
// import UserListItem from '../UserListItem/UserListItem';
import { Link } from 'react-router-dom';


export default function ConversationList({ conversations, users, activeConversation, setActiveConversation }) {
  console.log(conversations)
  const convos = conversations.map(convo =>
    <li
      key={convo}
      className={convo === activeConversation ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      onClick={() => setActiveConversation(convo)}
    >
      {convo}
        <Link
        className='btn btn-xs btn-warning'
        to={{
          pathname: '/editConversation',
          state: { convo },
        }}
      >
        EDIT
      </Link>
    </li>
  );

  return (
    <ul className="ConversationList">
     {convos}
     
    </ul>
  );
}
