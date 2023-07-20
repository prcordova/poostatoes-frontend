import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/PostPage.css";
import { UserContext } from "../context/userContext";
import Button from "../components/Button";
import ActionButton from "../components/ActionButton";
import { getPostById } from "../services/api";

export default function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    console.log(id);
    try {
      getPostById(id).then((fetchedPostInfo) => {
        setPostInfo(fetchedPostInfo);
      });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="created-at">
        <span className="author">Por {postInfo.author.username}</span>
        {userInfo.id === postInfo.author._id && (
          <Link to={`/edit/${postInfo._id}`}>
            <ActionButton ActionText="Editar" edit={true} />
          </Link>
        )}
        <time>
          {format(new Date(postInfo.createdAt), "dd MMM, yyyy | hh:mm")}
        </time>
      </div>
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="Post Cover" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
