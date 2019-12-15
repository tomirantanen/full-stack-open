const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
