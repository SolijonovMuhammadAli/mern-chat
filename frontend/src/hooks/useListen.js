import { useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useSocketContext } from "../Context/SocketContext";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = ChatState();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
      return () => socket?.off("newMessage");
    });
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
