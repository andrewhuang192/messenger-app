import './ConversationList.css';
import UserListItem from '../UserListItem/UserListItem';

export default function ConversationList({ users, activeConversation, setActiveConversation }) {
//   const allusers = users.map(user =>
//     <li
//       key={user}
//       className={user._id === activeConversation ? 'active' : ''}
//       // FYI, the below will also work, but will give a warning
//       // className={cat === activeCat && 'active'}
//       onClick={() => setActiveConversation(user.conversation._id)}
//     >
//       {user}
//     </li>
//   );

  return (
    <ul className="ConversationList">
      {users.map(user => (
					<UserListItem
						
						user={user}
						key={user._id}
					/>
				))}
    </ul>
  );
}
