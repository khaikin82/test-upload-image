import React, { useState } from "react";
import axios from "axios";

const UploadPost = ({ onNewPost }) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append(
      "post",
      new Blob([JSON.stringify(post)], { type: "application/json" })
    );
    formData.append("imageFile", file);

    try {
      const response = await axios.post("/api/v1/posts", formData, {
        baseURL: "http://localhost:8080",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onNewPost(response.data);
      console.log("Post uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
      />
      <textarea name="content" placeholder="Content" onChange={handleChange} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Post</button>
    </div>
  );
};

export default UploadPost;
