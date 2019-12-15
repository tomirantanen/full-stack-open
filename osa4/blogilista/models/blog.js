const mongoose = require("mongoose");
const config = require("../utils/config");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.model("Blog", blogSchema);
