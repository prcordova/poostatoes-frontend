import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import Input from "../components/Input";
import { createNewPost } from "../services/api";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "idalic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  async function handleCreateNewPost(e) {
    e.preventDefault();

    if (title && summary && content) {
      try {
        const token = "seu_jwt_aqui"; // Substitua pelo JWT real armazenado no frontend
        await createNewPost(title, summary, content, files, token);
        setRedirect(true);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form onSubmit={handleCreateNewPost}>
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
      <Input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
