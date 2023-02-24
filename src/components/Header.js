import React, { useState } from "react";

import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "../store";

axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const [value, setvalue] = useState(0);

  const sendLogoutRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return res;
    }

    return new Error("Unable To Logout. Please try Again!");
  };

  const handleLogout = () => {
    sendLogoutRequest()
      .then(() => {
        dispatch(logout());
      })
      .then(() => history("/"));
  };
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">MERN Auth</Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs
              indicatorColor="secondary"
              onChange={(e, val) => setvalue(val)}
              value={value}
              textColor="inherit"
            >
              {!isLoggedIn && (
                <React.Fragment>
                  <Tab to="/login" LinkComponent={Link} label="Login" />
                  <Tab to="/signup" LinkComponent={Link} label="Signup" />
                </React.Fragment>
              )}

              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/logout"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
