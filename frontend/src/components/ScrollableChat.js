import ScrollableFeed from "react-scrollable-feed";
import Message from "./Message";

const ScrollableChat = ({ messages }) => {
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i, array) => (
          <div key={i}>
            {array[i - 1] ? (
              array[i].createdAt.substring(0, 10) === array[i - 1].createdAt.substring(0, 10) ? (
                ""
              ) : (
                <div>
                  <br />
                  <br />
                  <span
                    style={{
                      color: "black",
                      fontSize: "10px",
                      padding: "15px 5px 5px 15px",
                      textAlign: "center",
                      marginLeft: "40%",
                      marginBottom: "10%",
                      backgroundColor: "lightblue",
                      borderRadius: "5px",
                      padding: "5px 15px",
                    }}
                  >
                    {m.createdAt.substring(0, 10)}
                  </span>

                  <br />
                  <br />
                </div>
              )
            ) : i - 1 < 0 ? (
              <div>
                <br />
                <br />
                <span
                  style={{
                    color: "black",
                    fontSize: "10px",
                    padding: "15px 5px 5px 15px",
                    textAlign: "center",
                    marginLeft: "45%",
                    marginBottom: "10%",
                    backgroundColor: "lightblue",
                    borderRadius: "20px",
                    padding: "5px 15px",
                  }}
                >
                  {m.createdAt.substring(0, 10)}
                </span>

                <br />
                <br />
              </div>
            ) : (
              ""
            )}

            <Message i={i} m={m} messages={messages} />
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
