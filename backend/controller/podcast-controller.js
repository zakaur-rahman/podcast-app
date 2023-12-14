import Podcast from "../model/podcast.js";
import createHttpError from "http-errors";

export const createPodcast = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const post = await new Podcast(data);
    post.save();
    response.status(200).json("Podcast saved successfully");
  } catch (e) {
    next(createHttpError(500, "Faild to upload"));
  }
};

export const getAllPodcast = async (request, response, next) => {
  let email = request.query.email;
  let category = request.query.category;
  let podcasts;
  try {
    if (email) posts = await Podcast.find({ email: email });
    else if (category) posts = await Podcast.find({ categories: category });
    else podcasts = await Podcast.find({});

    response.status(200).json(podcasts);
  } catch (error) {
    next(createHttpError(404, "Failed to load"));
  }
};

export const getPodcastById = async (req, res, next) => {
  const podcastData = await Podcast.findById(request.params.id);
  if (!podcastData) {
    return next(createHttpError(404, "Podcast not found"));
  }
  res.status(200).json(podcastData);
};
