import { useEffect, useState } from "react";
import axios from "../config/AxiosConfig";
import { Grid, GridItem } from "@chakra-ui/react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import "../App.css";

const Chatpage = () => {
  const { user } = ChatState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = () => {
    setIsLoading(true);
    axios
      .get("/user")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (!user) return <h1>User Not found</h1>;
  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        <SideDrawer />
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem colSpan={1}>
            <MyChats />
          </GridItem>
          <GridItem colSpan={4}>{/* {user && <Chatbox />} */} salom</GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default Chatpage;
