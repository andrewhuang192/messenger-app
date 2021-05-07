import './ConversationBox.css';
import MessageItem from '../MessageItem/MessageItem';

export default function ConversationBox({ messageItems, handleDeleteMessage }) {

    const messages = messageItems.map(message =>
        <MessageItem
            key={message._id}
            messageItem={message}
            handleDeleteMessage={handleDeleteMessage}
        />
    );

    return (
    <main className="ConversationBox">
          <div className="messageItems">
                
                        {messages}
                
           
              
          </div>
    </main>
  );
}