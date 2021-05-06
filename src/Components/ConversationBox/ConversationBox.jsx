import './ConversationBox.css';
import MessageItem from '../MessageItem/MessageItem';

export default function ConversationBox({ messageItems, handleDeleteMessage }) {
    console.log(messageItems)

    const messages = messageItems.map(message =>
        <MessageItem
            key={message._id}
            messageItem={message}
            handleDeleteMessage={handleDeleteMessage}
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