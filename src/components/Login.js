import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store";

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/login", input)
      .catch((err) => console.error(err));

    const data = await res.data;

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then(() => dispatch(login()))
      .then(() => history("/user"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          width={300}
          marginLeft="auto"
          marginRight="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2"> Login </Typography>

          <TextField
            type="email"
            value={input.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
          />
          <TextField
            type="password"
            value={input.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
          />
          <Button type="submit">Login</Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
