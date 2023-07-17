const express = require("express");
const { auth } = require("../Middleware/AuthMiddleware");
const { postModel } = require("../Model/postModel");

const postRoute = express.Router();

postRoute.post("/add", auth, async (req, res) => {
  try {
    const Newpost = new postModel(req.body);
    await Newpost.save();
    // console.log(req.body);
    res.status(200).json({ msg: "new post added" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

postRoute.get("/", auth, async (req, res) => {
  const { userID } = req.body;
  try {
    const Newpost = await postModel.find({ userID });
    res.status(200).json({ msg: "All post", Newpost });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
postRoute.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const post = await postModel.findOne({ _id: id });
    if (post.userID === userID) {
      await postModel.findByIdAndUpdate({ _id: id }, req.body);
      const post = await postModel.findOne({ _id: id });
      res.status(200).json({ msg: "updated post", post });
    } else {
      res.json({ msg: "you are not authorized to update this post" });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
postRoute.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const post = await postModel.findOne({ _id: id });
    if (post.userID === userID) {
      await postModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "deleted post", post });
    } else {
      res.json({ msg: "you are not authorized to delete this post" });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = { postRoute };
