import './ConversationList.css';
// import UserListItem from '../UserListItem/UserListItem';

export default function ConversationList({ conversations, users, activeConversation, setActiveConversation }) {
  // console.log(conversations)
  const convos = conversations.map(convo =>
    <li
      key={convo}
      className={convo === activeConversation ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      onClick={() => setActiveConversation(convo)}
    >
      {convo}
    </li>
  );

  return (
    <ul className="ConversationList">
     {convos}
    </ul>
  );
}
