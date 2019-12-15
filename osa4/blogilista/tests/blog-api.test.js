const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test-helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
  const promises = blogObjects.map(blog => blog.save());
  await Promise.all(promises);
});

test("A right amount of blogs are returned as json", async () => {
  const response = await api
    .get("/api/blogs")
    .expect("Content-Type", /application\/json/);

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
