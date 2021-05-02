import './UserList.css';

export default function UserList({ users, activeUser, setActiveUser }) {
  // const allUsers = users.map(user =>
  //   <li
  //     key={user}
  //     className={user === activeUser ? 'active' : ''}
  //     // FYI, the below will also work, but will give a warning
  //     // className={cat === activeCat && 'active'}
  //     onClick={() => setActiveUser(user)}
  //   >
  //     {user}
  //   </li>
  // );
  
  return (
    <ul className="UserList">
      <li>{users.name}</li>
    </ul>
  );
}
