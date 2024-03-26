import { Grid, GridItem } from "@chakra-ui/react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import "../App.css";

const Chatpage = () => {
  const { user } = ChatState();

  if (!user) return <h1>User Not found</h1>;

  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem colSpan={1}>{user && <MyChats />}</GridItem>
          <GridItem colSpan={4}>{user && <Chatbox />}</GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default Chatpage;
