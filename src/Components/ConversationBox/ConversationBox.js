import './ConversationBox.css';
import MessageItem from '../MessageItem/MessageItem';

export default function ConversationBox({ messageItems, handleAddToOrder }) {
  const messages = messageItems.map(message =>
    <MessageItem
      key={message._id}
      messageItem={message}
    />
  );
  return (
    <main className="MenuList">
      {messages}
    </main>
  );
}