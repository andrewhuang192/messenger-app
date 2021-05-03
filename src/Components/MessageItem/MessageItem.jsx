import './MessageItem.css';

export default function MessageItem({ messageItem }) {
  return (
    <div className="MessageItem">
      <div className="name">{messageItem.sender}</div>
      <div className="textmessage">{messageItem.message}</div>
      <div className="timestamp">
        <span>${messageItem.timestamp}</span>
      </div>
    </div>
  );
}