import mongoose from "mongoose";

const podcastSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required:true
  },
  Speaker: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
});

const Podcast = mongoose.model("podcast", podcastSchema);
export default Podcast;
