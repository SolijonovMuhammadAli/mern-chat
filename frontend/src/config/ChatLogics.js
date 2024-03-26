export const getSender = (loggedUser, users) => {
  return users[0] === loggedUser ? users[0].username : users[1].username;
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (i < messages.length - 1 && messages[i + 1]._id === m._id && messages[i]._id !== userId) return 33;
  else if (
    (i < messages.length - 1 && messages[i + 1]._id !== m._id && messages[i]._id !== userId) ||
    (i === messages.length - 1 && messages[i]._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1]._id !== m._id || messages[i + 1]._id === undefined) &&
    messages[i]._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return i === messages.length - 1 && messages[messages.length - 1]._id !== userId && messages[messages.length - 1]._id;
};

export const isLastMessageOnDifferentDateFromPrevMessage = (messages) => {
  return (
    messages.length - 2 >= 0 &&
    messages[messages.length - 1].createdAt.substring(0, 10) ===
      messages[messages.length - 2].createdAt.substring(0, 10)
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1]._id === m._id;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
