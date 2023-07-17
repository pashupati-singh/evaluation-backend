const mongoose = require("mongoose");

const BlackListSchema = mongoose.Schema(
  {
    token: String,
  },
  {
    versionKey: false,
  }
);

const blacklistModel = mongoose.model("blacklist", BlackListSchema);

module.exports = { blacklistModel };
