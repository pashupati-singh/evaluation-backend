const { userModel } = require("../Model/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { blacklistModel } = require("../Model/blacklist");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(200).json({ msg: "User Already Exist" });
  }
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.status(200).json({ err: err });
      } else if (hash) {
        const user = new userModel({ name, email, password: hash, gender });
        await user.save();
        res.status(200).json({ msg: "new user added" });
      }
    });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
          return res.status(200).json({ err: err });
        } else if (result) {
          const token = jwt.sign(
            { userID: user._id, userName: user.name },
            process.env.secretKey
          );
          res.status(200).json({ msg: "logged in", token });
        }
      });
    } else {
      return res.status(200).json({ msg: "REgister first" });
    }
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

userRoute.get("/logout", async (req, res) => {
  const { token } = req.headers.authorization?.split(" ")[1];

  try {
    const blacklist = new blacklistModel({ token });
    await blacklist.save();
    res.status(200).json({ msg: "sucessfully Logged out" });
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = { userRoute };
