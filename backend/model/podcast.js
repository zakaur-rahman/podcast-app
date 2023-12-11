import mongoose from "mongoose";

const podcastSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required:true
  },
  url: {
    type: String,
    required:true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Speaker: {
    type: String,
    required:true
  },
  type: {
    type: String,
    required: true
  }
});

const Podcast = mongoose.model("podcast", podcastSchema)
export default Podcast