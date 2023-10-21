import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function Post({
  author,
  _id,
  title,
  summary,
  cover,
  createdAt,
  content,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link to="/" className="author">
            {author?.username}
          </Link>
          <time>{format(new Date(createdAt), "dd MMM, yyyy | hh:mm")}</time>
        </p>
        <p className="summary"> {summary}</p>
      </div>
    </div>
  );
}
