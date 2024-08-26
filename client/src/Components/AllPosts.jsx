import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackendPath from "../BackendPath";

const AllPosts = () => {
  const [Blogs, SetBlogs] = useState([]);

  const getAllPost = async () => {
    try {
      await axios.get(`${BackendPath}/posts`).then((response) => {
        console.log(response.data.AllPosts);
        console.log("in");
        SetBlogs(response.data.AllPosts);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);
  const navigate=useNavigate();
  return (
    <div
      
      style={{ height: "100vh", borderTopLeftRadius: "30px" }}
    >
      <div className="AllPostsContainer">
      {Blogs.length > 0 ? (
        Blogs.map((blog) => (
          <div >
            {/* <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>Author: {blog.Author}</p> */}
            <Card
              key={blog._id}
              onClick={()=>{navigate(`/post/${blog._id}`)}}
              sx={{
                height: "200px",
                width: "300px",
                margin: "20px", // 10px top and bottom, 20px left and right
                borderRadius: "10px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardMedia image="" />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created At{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                </Typography>
                <Typography>Created By: {blog.Author}</Typography>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
      </div>
    </div>
  );
};

export default AllPosts;
