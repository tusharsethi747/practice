import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BackendPath from "../BackendPath";
const UpdateBlog = () => {
  const navigate=useNavigate();
  const [Blog, SetBlog] = useState({});
  const {id} = useParams();
  const [inputs, SetInputs] = useState({
    title: "",
    content: "",
    Author: "",
  });
  
  const getBlogDetails= async()=>{
    try {
        const response = await axios.get(`${BackendPath}/posts/${id}`);
        console.log(response.data.MyPost);
        SetBlog(response.data.MyPost);
        SetInputs({
          title: response.data.MyPost.title,
          content: response.data.MyPost.content,
          Author: response.data.MyPost.Author,
        });
      } catch (error) {
        console.log("issue in get api");
        console.log(error);
      }
  }

  useEffect(()=>{
    getBlogDetails();
  },[id])

  const handleChange = (e) => {
    SetInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${BackendPath}/posts/${id}`, {
        title: inputs.title,
        content: inputs.description,
      });
      navigate(`/mypost`);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="PostBlog">
        <img
          src=""
          alt="image will be here"
          style={{ position: "relative", top: "-140px" }}
        />
        <form className="FormContainer" onSubmit={handleSubmit}>
          <div className="formDiv1">
            <TextField
              id="BlogTitle"
              label="Title"
              variant="outlined"
              onChange={handleChange}
              value={inputs.title}
              required
            />
            <textarea
              id="BlogDesc"
              label="Description"
              variant="outlined"
              required
              style={{ width: "35vw", height: "250px" }}
              value={inputs.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button variant="outlined" sx={{ marginLeft: "10px" }} type="submit">
              Post Blog
            </Button>
          </div>
        </form>
      </div> */}


<div className="PostBlog">
      <img
        src=""
        alt="image will be here"
        style={{ position: "relative", top: "-140px" }}
      />
      <form className="FormContainer" onSubmit={handleSubmit}>
        <div className="formDiv1">
          <TextField
            id="BlogTitle"
            label="Title"
            variant="outlined"
            name="title"  // Add name attribute
            onChange={handleChange}
            value={inputs.title}
            required
          />
          <textarea
            id="BlogDesc"
            label="Description"
            variant="outlined"
            name="content"  // Add name attribute
            required
            style={{ width: "35vw", height: "250px" }}
            value={inputs.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <Button variant="outlined" sx={{ marginLeft: "10px" }} type="submit">
            Post Blog
          </Button>
        </div>
      </form>
    </div>

    
    </>
  );
};

export default UpdateBlog;
