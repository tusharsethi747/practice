import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BackendPath from "../BackendPath";
const MakePost = () => {
  // Step 1: Manage form state
  const [title, setTitle] = useState('');
  const [content, setDescription] = useState('');
  const navigate=useNavigate();

  // Step 2: Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Get the JWT from localStorage
    let token = localStorage.getItem('token');

    // if (!token) {
    //   console.error('No token found. Please login first.');
    //   return;
    // }

    const postData = {
      title,
      content,
    };
    console.log(token);
    console.log(postData);
    
    if (!token) {
      console.error('Token not found');
      return;
    }

    token = token.replace(/^"|"$/g, '').trim();
    
    try {
      const response = await axios.post(`${BackendPath}/posts`, {title,content}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
        console.log('Post created successfully:', response.data);
      // }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error (e.g., show an error message)
    }
  };


  return (
    <>
      <div className="PostBlog">
        <img src="" alt="image will be here" style={{ position: "relative", top: "-140px" }} />
        <form className="FormContainer" onSubmit={handleSubmit}>
          <div className="formDiv1">
            <TextField
              id="BlogTitle"
              label="Title"
              variant="outlined"
              required
              value={title} // Bind state to input
              onChange={(e) => setTitle(e.target.value)} // Update state on input change
              fullWidth
            />
            <textarea
              id="BlogDesc"
              placeholder="Content"
              required
              value={content} // Bind state to input
              onChange={(e) => setDescription(e.target.value)} // Update state on input change
              style={{ width: "35vw", height: "250px", padding: "10px", fontSize: "15px" }}
            />
          </div>
          <div>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginLeft: "10px", backgroundColor: "purple", borderRadius: "10px" }}
            >
              Post Blog
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MakePost;
