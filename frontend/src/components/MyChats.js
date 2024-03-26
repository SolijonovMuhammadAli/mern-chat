import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "../config/AxiosConfig";
import { useEffect, useState } from "react";
import ChatLoading from "./ChatLoading";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useSocketContext } from "../Context/SocketContext";

const MyChats = () => {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { onlineUsers } = useSocketContext();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    await axios
      .get("/user")
      .then((res) => setChats(res.data))
      .catch((err) =>
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Box bg="#fff" w="100%" h="88vh" overflowY="scroll">
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <div key={chat._id}>
                <span
                  style={{
                    float: "right",
                    color: "black",
                    fontSize: "11px",
                    marginTop: "11px",
                    color: "green",
                  }}
                >
                  {chat?.latestMessage?.createdAt.substring(0, 10) ===
                  new Date(Date.now()).toISOString().substring(0, 10)
                    ? chat?.latestMessage?.createdAt.substring(11, 16)
                    : chat?.latestMessage?.createdAt.substring(0, 10)}
                </span>
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#25D366" : "#fff"}
                  color={selectedChat === chat ? "black" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  style={{ display: "flex" }}
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={chat.profilePic}
                    src={chat.profilePic}
                    color="black"
                  />
                  <Text>
                    &nbsp;&nbsp;&nbsp;
                    {chat.fullname}
                    {onlineUsers.includes(chat._id) && <Text fontSize="xs">online</Text>}
                  </Text>
                </Box>
              </div>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </>
  );
};

export default MyChats;
