import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { getAllPosts } from "../services/api";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      getAllPosts().then((fetchedPosts) => {
        setPosts(fetchedPosts);
        console.log(fetchedPosts);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          <h2>Nenhum post cadastrado, crie um novo agora !</h2>
        )}
      </div>
    </>
  );
}
