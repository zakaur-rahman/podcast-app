import React from "react";

import image from "../../Assets/music.jpg"
const Post = ({ post }) => {
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };
  return (
    <div className="border border-solid border-gray-300 rounded-md m-10 flex items-center flex-col h-350">
      {post.type === "audio" ? (
        <img
        src={image}
        className=" object-fill h-32 w-72 overflow-hidden"
        alt="audio"
      />
      ) : (
        <video className=" object-fill h-32 w-72 overflow-hidden">
          <source src={post.fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <p className="py-0 px-5 mb-1 text-gray-700 text-sm">{post.categories}</p>
      <p className="py-0 px-5 mb-1 text-l font-semibold">
        {addEllipsis(post.title, 20)}
      </p>
      <p className="py-0 px-5 mb-1 text-gray-700 text-sm">
        Speaker : {post.speaker}
      </p>
      <p className="py-0 px-5 mb-1 text-sm break-words">
        {addEllipsis(post.description, 50)}
      </p>
    </div>
  );
};

export default Post;
