import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import Pencil from ".././assets/pencil.png";
import delete1 from ".././assets/delete.png";
import BackendPath from "../BackendPath";
import { useNavigate } from "react-router-dom";

const UsersPost = () => {
  const [Blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("userPayload"));
        if (!user || !user.username) {
          throw new Error("User not logged in or username missing.");
        }

        const response = await axios.get(`${BackendPath}/user/posts`);
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      let token = localStorage.getItem("token"); // Ensure the token is correctly retrieved
      token = token.replace(/^"|"$/g, '').trim();
      const response = await axios.delete(`${BackendPath}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const currentPath = window.location.pathname;
      navigate(currentPath, { replace: true });
      console.log(`deleted successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  return (
    <div style={{ height: "100vh", borderTopLeftRadius: "30px" }}>
      <h1 style={{ textAlign: "center" }}>
        {" "}
        Your <span style={{ color: "purple" }}>Blogs</span>{" "}
      </h1>

      <div className="UserContainer">
        {Blogs.length > 0 ? (
          Blogs.map((blog) => (
            <div key={blog._id}>
              {/* <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>Author: {blog.Author}</p> */}
              <Card
                sx={{
                  height: "250px",
                  width: "300px",
                  margin: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardMedia image="" />
                <div
                  onClick={() => {
                    navigate(`/post/${blog._id}`);
                  }}
                >
                  <CardContent className="UserPostsCard">
                    <Typography>Image will be here !!</Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ fontWeight: 700 }}
                    >
                      {blog.title}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                  {blog.content}
                </Typography> */}
                    <Typography>
                      Created At{" "}
                      {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                    </Typography>
                  </CardContent>
                </div>
                <div className="CardIcons">
                  <img
                    src={Pencil}
                    onClick={() => {
                      navigate(`/update/${blog._id}`);
                    }}
                  />
                  <img
                    src={delete1}
                    onClick={() => {
                      handleDelete(blog._id);
                    }}
                  />
                </div>
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

export default UsersPost;
