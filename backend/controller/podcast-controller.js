import Podcast from "../model/podcast.js";
import createHttpError from "http-errors";
import cloudinary from 'cloudinary'

export const uploadPodcast = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const { id } = "ksjsjiw99a";
    if (!data.title || !data.description || !data.url) {
      throw createHttpError.BadRequest("Missing data");
    }
    const file = data.file;
    const myCloud = await cloudinary.v2.uploader.upload(file, {
      folder: "file",
    });

    const podcastData = new Podcast({
      title: data.title,
      description: data.description,
      file: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      author: id,
      speaker: data.speaker,
      type: data.type,
    });
    await podcastData.save();
    res.status(200).json("Podcast uploaded..");
  } catch (e) {
    next(createHttpError(500, "Faild to upload"));
  }
};

export const getAllPodcasts = async (req, res, next) => {
  try {
    const podcasts = await Podcast.getAllPodcasts();
    res.status(200).json(podcasts);
  } catch (err) {
    next(createHttpError(500, "Failed to fetch podcasts"));
  }
};

export const getPodcastById = async (req, res, next) => {
  const { id } = req.params;
  const podcastData = await Podcast.getPodcastById(id);
  if (!podcastData) {
    return next(createHttpError(404, "Podcast not found"));
  }
  res.status(200).json(podcastData);
};

/* export const fileHandler = async (req, res, next) => {
  try{
    const data = req.body
    if(!data){
      throw next(createHttpError(404, "File not found"))
    }
    
    res.status(200).json(myCloud)
  }catch(e){

  }
} */
