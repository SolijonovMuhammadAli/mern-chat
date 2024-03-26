import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "../config/AxiosConfig";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box bg="#fff" w="100%" h="88vh" overflowY="scroll">
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <div>
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
                    name={
                      !chat.isGroupChat
                        ? user._id === chat.users[0]._id
                          ? chat.users[1].name
                          : chat.users[0].name
                        : chat.chatName
                    }
                    src={
                      !chat.isGroupChat
                        ? user._id === chat.users[0]._id
                          ? chat.users[1].name
                          : chat.users[0].name
                        : chat.chatName
                    }
                    color="black"
                    bg={`#${Math.floor((getSender(loggedUser, chat.users).charCodeAt(0) / 1000) * 18789500).toString(
                      16
                    )}`}
                  />
                  <Text>
                    &nbsp;&nbsp;&nbsp;
                    {!chat.isGroupChat
                      ? user._id === chat.users[0]._id
                        ? chat.users[1].name
                        : chat.users[0].name
                      : chat.chatName}
                    {/* {chat.chatName}*/}
                    {chat.latestMessage && (
                      <Text fontSize="xs">
                        &nbsp;&nbsp;&nbsp;
                        <b>{chat.isGroupChat ? chat.latestMessage.sender.name + " : " : " "}</b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </Text>
                    )}
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

{
  /* */
}
{
  /* </Box> */
}
