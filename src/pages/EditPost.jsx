import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Input from "../components/Input";
import { useEffect } from "react";
import { API_BASE_URL, updatePost } from "../services/api";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [cover, setCover] = useState("");
  const { id } = useParams();

  useEffect(() => {
    try {
      fetch(`${API_BASE_URL}/post/${id}`)
        .then((response) => response.json())
        .then((postInfo) => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setCover(postInfo.cover);
          // Se `files` é um campo que pode ser editado, você também deve definir `files` aqui.
          // Por exemplo:
          // setFiles(postInfo.files);
        });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

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
      await fetch(`${API_BASE_URL}/post`, {
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
