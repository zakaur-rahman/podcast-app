import Podcast from "../model/podcast.js";
import createHttpError from "http-errors";

export const createPodcast = async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    const podcast = new Podcast(data);
    await podcast.save();
    res.status(200).json("Podcast saved successfully");
  } catch (e) {
    console.log(e);
    next(createHttpError(500, "Faild to upload"));
  }
};

export const getAllPodcast = async (req, res, next) => {
  let email = req.query.email;
  let category = req.query.category;
  console.log(req);
  let podcasts;
  try {
    if (email) podcasts = await Podcast.find({ email: email });
    else if (category) podcasts = await Podcast.find({ categories: category });
    else podcasts = await Podcast.find({});

    res.status(200).json(podcasts);
  } catch (error) {
    next(createHttpError(404, "Failed to load"));
  }
};

export const getPodcastById = async (req, res, next) => {
  const podcastData = await Podcast.findById(req.params.id);
  if (!podcastData) {
    return next(createHttpError(404, "Podcast not found"));
  }
  res.status(200).json(podcastData);
};


export const deletePodcast = async (request, response, next) => {
  try {
    console.log(request);
      const post = await Podcast.findById(request.params.id);

      await post.deleteOne()

      response.status(200).json('Post deleted successfully');
  } catch (error) {
    return next(createHttpError(error));
  }
}