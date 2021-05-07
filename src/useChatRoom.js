import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = "http://localhost:3030";

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [incomingMessageToAdd, setIncomingMessageToAdd] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.sender === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      setIncomingMessageToAdd(incomingMessage);
    });
    
    
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      // conversation: "609432da5da2e13097e1e167",
      message: messageBody,
      sender: socketRef.current.id,
    });
  };
  // console.log(messages)
  // console.log(incomingMessageToAdd)

  return { messages, sendMessage, incomingMessageToAdd };
};

export default useChatRoom;