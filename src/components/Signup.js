import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [input, setInput] = useState({
    name: "",
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
      .post("http://localhost:5000/api/signup", input)
      .then(() => history("/login"))
      .catch((err) => console.error(err));

    const data = await res.data;

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
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
          <Typography variant="h2"> Signup </Typography>
          <TextField
            type="text"
            value={input.name}
            variant="outlined"
            placeholder="Name"
            margin="normal"
            name="name"
            onChange={handleChange}
          />
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
          <Button type="submit">Signup</Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
