import { createContext, useEffect, useState, useContext } from "react";
import { ChatState } from "./ChatProvider";
import io from "socket.io-client";

export const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { user } = ChatState();

  useEffect(() => {
    if (user) {
      const socket = io("http://localhost:8000", {
        query: { userId: user.userId },
      });
      setSocket(socket);

      socket.on("getOnlineUser", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
