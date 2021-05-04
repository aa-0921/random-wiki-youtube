import "../assets/App.css";

// import React, { useState, useEffect } from "react";
import React from "react";

import { Badge } from "react-bootstrap";

export const Tags = (props) => {
  // const [images, setImages] = useState([]);
  //検索フォームの文字列
  // const [text, setText] = useState("");
  //今なんの検索文字列で検索しているか
  // const [query, setQuery] = useState("apple");

  return (
    <React.Fragment>
      {props.image.tags.map((tag, index) => (
        <Badge key={index} pill variant="secondary" className="mx-1">
          {tag.title}
        </Badge>
      ))}
    </React.Fragment>
  );
};
