import './ConversationBox.css';
import MessageItem from '../MessageItem/MessageItem';

export default function ConversationBox({ messageItems }) {
    // console.log(messageItems)
  const messages = messageItems.map(message =>
    <MessageItem
      key={message._id}
      messageItem={message}
    />
  );
  return (
    <main className="ConversationBox">
        <table>
            <tbody>
            <tr>
                <td>john doe</td>
                <td>4 hours ago</td>
            </tr>
            <tr>
                <td>'hi this is just a placeholder'</td>
            </tr>
            <tr>
                <td>andrew</td>
                <td>4 hours ago</td>
            </tr>
            <tr>
                <td>'hi this is just a placeholder'</td>
            </tr>
            <tr>
                <td>john doe</td>
                <td>4 hours ago</td>
            </tr>
            <tr>
                <td>'hi this is just a placeholder'</td>
            </tr>
            <tr>
                <td>andrew</td>
                <td>4 hours ago</td>
            </tr>
            <tr>
                <td>{messages}</td>
      
            </tr>
            </tbody>
        </table>
      
    </main>
  );
}