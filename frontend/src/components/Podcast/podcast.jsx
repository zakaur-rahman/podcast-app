import React from "react";

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <div className="border border-solid border-gray-300 rounded-md m-10 flex flex-col items-center h-350">
            <img className="w-full object-cover border-b-2 border-gray-300 rounded-t-md h-150" src={url} alt={"post"} />
            <p className="py-0 px-5 mb-1 text-gray-700 text-sm">{post.categories}</p>
            <p className="py-0 px-5 mb-1 text-xl font-semibold">{addEllipsis(post.title, 20)}</p>
            <p className="py-0 px-5 mb-1 text-gray-700 text-sm">Author: {post.name}</p>
            <p className="py-0 px-5 mb-1 text-sm break-words">{addEllipsis(post.description, 100)}</p>
        </div>
    )
}

export default Post;