import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Greet from '../assets/robot-hello.gif'
import BackendPath from "../BackendPath";
const Login = () => {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [email,SetEmail]=useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    console.log("inside of handle submit ");
    event.preventDefault();
    const data = {
      username,
      email,
      password,
    };
    axios
      .post(`${BackendPath}/signup`, data)
      .then((response) => {
        localStorage.setItem(
          "userPayload",
          JSON.stringify(response.data.Payload)
        );
        localStorage.setItem("token",(response.data.token));
        
        navigate(`/posts`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ height: "100vh" , display:"flex", flexDirection:"row", gap:"90px"}}>
      <div>
        <div className="LoginHeader" style={{ display: "block" }}>
          <div style={{ marginTop: "30px" }}>
            <h2>
              Welcome to the{" "}
              <span style={{ color: "purple", fontWeight: "700" }}>ZuAI</span>{" "}
              Blog website{" "}
            </h2>
          </div>
          <h4>Please Signup to continue </h4>
        </div>
        <div className="LoginFormContainer">
          <form onSubmit={handleSubmit} className="LoginForm">
            <TextField
              placeholder="Username"
              value={username}
              onChange={(e) => SetUsername(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{ backgroundColor: "purple" }}
              onSubmit={handleSubmit}
            >
              {" "}
              Signup{" "}
            </Button>
          </form>
        </div>
      </div>
      <div className="GreetImage">
        <img src={Greet} alt="image here " className="ImageLogin"/>
      </div>
    </div>
  );
};

export default Login;
