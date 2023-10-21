import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPosts } from "../services/api";
import AdComponent from "../components/AdComponent";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      getAllPosts().then((fetchedPosts) => {
        setPosts(fetchedPosts);
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <AdComponent />
      <div>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post._id} {...post} />)}
      </div>
    </>
  );
}
