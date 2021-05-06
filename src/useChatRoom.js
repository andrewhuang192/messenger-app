import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_MESSAGE_EVENT = "new-message-event";
const SOCKET_SERVER_URL = "http://localhost:3030";

const useChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.on(NEW_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        isOwner: message.sender === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_MESSAGE_EVENT, {
      conversation: "60938348f52d7841f8043ce1",
      message: messageBody,
      sender: socketRef.current.id,
    });
  };
  // console.log(messages)

  return { messages, sendMessage };
};

export default useChatRoom;