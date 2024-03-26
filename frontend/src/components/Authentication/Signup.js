import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "./../../config/AxiosConfig";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  // fullname, username, password, confirm, gender
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("male");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");

  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!fullname || !username || !password || !confirm) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirm) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }

    await axios
      .post("/auth/signup", { fullname, username, password, confirm, gender })
      .then((res) => {
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        history.push("/chats");
      })
      .catch((err) =>
        toast({
          title: "Error Occured!",
          description: err.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
      )
      .finally(() => setPicLoading(false));
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Full Name</FormLabel>
        <Input placeholder="Enter Your Name" onChange={(e) => setFullname(e.target.value)} borderColor="black" />
      </FormControl>
      <FormControl id="username" isRequired>
        <FormLabel>User name</FormLabel>
        <Input placeholder="Enter Your username " onChange={(e) => setUsername(e.target.value)} borderColor="black" />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            borderColor="black"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirm(e.target.value)}
            borderColor="black"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <RadioGroup onChange={setGender} value={gender}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </RadioGroup>
      </FormControl>
      <Button colorScheme="green" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={picLoading}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
