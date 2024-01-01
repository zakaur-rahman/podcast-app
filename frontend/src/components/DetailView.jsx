import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image from "../Assets/music.jpg";

import { RiDeleteBinLine } from "react-icons/ri";
import { API } from "../service/api";
import { DataContext } from "../context/DataProvider";

const DetailView = () => {
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
     try{
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        console.log(response.data);
        setPost(response.data);
      }
     }catch(error){
      console.log(error.msg);
      navigate('/login')
     }
    };
    fetchData();
  }, []);

  const deleteBlog = async () => {
    console.log(post._id);
    await API.deletePodcast(post._id);
    navigate("/");
  };

  return (
    <div className="m-10 flex flex-col items-center">
      {post.type === "video" && (
        <div>
          <video controls width={1280}>
            <source src={post.fileUrl} type="video/mp4" />
          </video>
        </div>
      )}
      {post.type === "audio" && (
        <div className="px-64">
          <img src={image} alt="thumbnail" className=" img" />
          <audio controls className="w-full">
            <source src={post.fileUrl} type="audio/mp3" />
          </audio>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between w-full">
        <div>
          <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="font-semibold">
          Speaker: <span className="font-bold">{post.speaker}</span>
        </p>
        </div>
        {account.email === post.email && (
            <RiDeleteBinLine
            className="cursor-pointer ml-4 text-red-500 h-10 w-10"
            onClick={() => deleteBlog()}
            />
            )}
      </div>
      <div className="mt-4 flex items-center justify-between w-full">
            <p className="mt-2">{post.description}</p>
        <p className="text-gray-500">
          {new Date(post.createdDate).toDateString()}
        </p>
      </div>
    </div>
  );
};

export default DetailView;
