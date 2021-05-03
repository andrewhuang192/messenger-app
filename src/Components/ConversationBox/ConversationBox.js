import './ConversationBox.css';
import MessageItem from '../MessageItem/MessageItem';

export default function ConversationBox({ messageItems }) {
    const messages = messageItems.map(message =>
        <MessageItem
            key={message._id}
            messageItem={message}
        />
    );

    // console.log(messages)

    return (
    <main className="ConversationBox">
          <table className="messageItems">
                
                        {messages}
                
           
              
          </table>
    </main>
  );
}