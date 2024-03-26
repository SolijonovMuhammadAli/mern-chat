import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "../../config/AxiosConfig";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!username || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(username, password);
    await axios
      .post("/auth/login", { username, password })
      .then((res) => {
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        history.push("/chats");
      })
      .catch((err) => {
        toast({
          title: "Error Occured!",
          description: err.response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <VStack spacing="10px">
      <FormControl id="username" isRequired>
        <FormLabel>username Address</FormLabel>
        <Input
          value={username}
          type="username"
          placeholder="Enter Your username Address"
          onChange={(e) => setUsername(e.target.value)}
          borderColor="black"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            borderColor="black"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme="green" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setUsername("shaxnoz");
          setPassword("1234456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
