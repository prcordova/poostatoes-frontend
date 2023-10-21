import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Input from "../components/Input";
import { useEffect } from "react";
import { updatePost } from "../services/api";
export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [cover, setCover] = useState("");

  useEffect(() => {
    try {
      fetch("http://localhost:4000/post/" + id).then((response) => {
        response.json().then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const { id } = useParams();
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  async function handleUpdatePost(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("id", id);

      if (files?.[0]) {
        data.set("file", files?.[0]);
      }
      await fetch("http://localhost:4000/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleUpdatePost}>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} multiple />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
}
