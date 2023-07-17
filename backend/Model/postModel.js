const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    userID: String,
    userName: String,
  },
  {
    versionKey: false,
  }
);

const postModel = mongoose.model("post", PostSchema);

module.exports = { postModel };
