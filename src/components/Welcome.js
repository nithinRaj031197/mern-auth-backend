import axios from "axios";
import React, { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

let firstRender = true;

const Welcome = () => {
  const [user, setuser] = useState();

  const refreshToken = async () => {
    const resp = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.error(err));

    const data = await resp.data;
    console.log(data);
    return data;
  };

  const sendRequest = async () => {
    const resp = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true, // to send back data which recieved in cookie
      })
      .catch((err) => console.error(err));

    const data = await resp.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setuser(data.user));
    }

    let interval = setInterval(() => {
      refreshToken().then((data) => setuser(data.user));
    }, 1000 * 28);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div>{user && <h1>{user.name}</h1>}</div>;
};

export default Welcome;
