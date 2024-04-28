import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import Input from "../components/Input";
import { createNewPost } from "../services/api";
import { UserContext } from "../context/userContext";

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
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { userInfo } = useContext(UserContext);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  async function handleCreateNewPost(e) {
    e.preventDefault();

    if (title && summary && content) {
      try {
        const token = userInfo.token;

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
        label={"Title"}
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        label={"Summary"}
        type="text"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <Input
        label={"File"}
        name="file"
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        multiple
      />

      <Editor value={content} onChange={setContent} />
      <button
        className="create-new-post-btn"
        style={{
          marginTop: "8px",
          borderRadius: ".5rem",
          backgroundColor: "blue",
          color: "white",
          border: "none",
        }}
      >
        Create
      </button>
    </form>
  );
}
