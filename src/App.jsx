import React, { useState, useEffect } from "react";
import axios from "axios";
import PostList from "./components/PostList";
import UploadPost from "./components/UploadPost";

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/posts");
      const postsWithImages = await Promise.all(
        response.data.map(async (post) => {
          const imageResponse = await axios.get(
            `http://localhost:8080/api/v1/posts/${post.id}/image`,
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...post, imageUrl };
        })
      );
      setPosts(postsWithImages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNewPost = (newPost) => {
    // Fetch the image for the new post
    axios
      .get(`http://localhost:8080/api/v1/posts/${newPost.id}/image`, {
        responseType: "blob",
      })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setPosts([...posts, { ...newPost, imageUrl }]);
      })
      .catch((error) => console.error("Error fetching image:", error));
  };

  return (
    <div>
      <h1>My Blog</h1>
      <UploadPost onNewPost={handleNewPost} />
      <PostList posts={posts} />
    </div>
  );
};

export default App;
