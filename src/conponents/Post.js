import React, { useState } from "react";

const Post = ({ postObj }) => {
  return (
    <li>
      <h4>{postObj.content}</h4>
    </li>
  );
};

export default Post;
