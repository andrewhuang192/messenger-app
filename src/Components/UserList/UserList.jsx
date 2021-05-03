import './UserList.css';
import UserListItem from '../../Components/UserListItem/UserListItem';

export default function UserList({ users, activeConversation, setActiveConversation }) {
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
    <ul className="UserList">
      {users.map(user => (
					<UserListItem
						
						user={user}
						key={user._id}
					/>
				))}
    </ul>
  );
}
