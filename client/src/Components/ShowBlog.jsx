import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import BackendPath from "../BackendPath";
const ShowBlog = () => {
  const [Blog, SetBlog] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${BackendPath}/posts/${id}`)
      .then((response) => {
        console.log(response.data.MyPost);
        SetBlog(response.data.MyPost);
      })
      .catch((error) => {
        console.log(`error in get api post by id`);
        console.log("error found ");
      });
  }, [id]);
  const createdAt=Blog.createdAt;
  const date = new Date(createdAt);

  // Extract day, month, and year
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();
  
      // Format as day/month/year
      const formattedDate = `${day}/${month}/${year}`;
  return (
    
    <div style={{ height: "100vh" }} className="ShowBlogContainer">
      <div className="BlogHeader">
        <span
          style={{
            color: "grey",
            borderWidth: "3px",
            borderRadius: "12px",
            backgroundColor: "white",
            padding: "4px",
            fontSize: "14px",
          }}
        >
          <a>Useful Resources</a>
        </span>
        <h1 style={{ fontWeight: "700" }}>{Blog.title}</h1>
    

        <div className="BelowTitle">
          <div className="publishInfo">
            <span style={{ color:"grey"}}>Published On: </span>
            <span style={{color:"grey"}}>{formattedDate}</span>
          </div>
          <div className="ReadInfo" style={{  textAlign: "left" }}>
            <span style={{color:"grey"}}>Read Time</span>
            <span style={{color:"grey"}}>4 Mins</span>
          </div>
        </div>
      </div>

      <div className="TitleImage">
          <img  src="" alt="my image will be here "/>
      </div>

      <div className="BlogContentContainer">
        <div className="BlogContent">{Blog.content}</div>
      </div>
    </div>
  );
};

export default ShowBlog;
