import React from "react";

const PostList = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} width="300" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
