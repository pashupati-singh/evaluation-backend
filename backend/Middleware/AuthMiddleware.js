const jwt = require("jsonwebtoken");
require("dotenv").config();
const { blacklistModel } = require("../Model/blacklist");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const Token = await blacklistModel.findOne({ token });
    if (Token) {
      return res.json({ msg: "please login again" });
    }
    jwt.verify(token, process.env.secretKey, (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.userName = decoded.userName;
        next();
      } else if (err) {
        res.json({ msg: "Token expired!" });
      }
    });
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

module.exports = { auth };
