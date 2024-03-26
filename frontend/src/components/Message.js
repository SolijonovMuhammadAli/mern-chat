import React from "react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/ChatLogics";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChatState } from "../Context/ChatProvider";

function Message({ messages, m, i }) {
  const { user, selectedChat } = ChatState();

  const fromMe = m.senderId === user.userId;
  const profilePic = fromMe ? user.profilePic : selectedChat.profilePic;
  const style = fromMe ? { flexDirection: "row-reverse" } : {};

  return (
    <div style={{ display: "flex", gap: "4px", ...style }} key={m.userId}>
      {(isSameSender(messages, m, i, user.userId) || isLastMessage(messages, i, user.userId)) && (
        <Tooltip label={m.username} placement="bottom-start" hasArrow>
          <Avatar
            mt="7px"
            size="sm"
            cursor="pointer"
            name={profilePic}
            src={profilePic}
            color="white"
            bg={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          />
        </Tooltip>
      )}
      <span
        style={{
          backgroundColor: `${m._id === user._id ? "	#25D366" : "#ffffff"}`,
          color: "black",
          marginLeft: isSameSenderMargin(messages, m, i, user._id),
          marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
          borderRadius: "20px",
          padding: "5px 15px",
          maxWidth: "75%",
        }}
      >
        {m.message}
        <span
          style={{
            color: "black",
            fontSize: "10px",
            padding: "15px 5px 5px 15px",
          }}
        >
          {m.updatedAt.substring(11, 16)}
        </span>
      </span>
    </div>
  );
}

export default Message;
