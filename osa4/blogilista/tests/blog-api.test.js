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

describe("When there are initially some blogs saved", () => {
  test("all the blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/);

    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test("Each blog has an identifier", async () => {
    const response = await api.get("/api/blogs");
    response.body.map(blog => expect(blog.id).toBeDefined());
  });
});

describe("Addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const postResponse = await api.post("/api/blogs").send(helper.singleBlog);
    const getResponse = await api.get("/api/blogs");

    expect(getResponse.body.length).toBe(helper.initialBlogs.length + 1);

    const blog = getResponse.body.find(
      blog => blog.id === postResponse.body.id
    );
    expect(blog).toBeDefined();
  });

  test("without likes is given default value of 0 likes", async () => {
    const postResponse = await api
      .post("/api/blogs")
      .send(helper.blogWithoutLikes);
    const getResponse = await api.get("/api/blogs");

    const blog = getResponse.body.find(
      blog => blog.id === postResponse.body.id
    );
    expect(blog.likes).toBe(0);
  });

  test("fails with status code 400 if data is invalid", async () => {
    const response = await api
      .post("/api/blogs")
      .send(helper.blogWithoutTitleAndUrl);
    expect(response.status).toBe(400);
  });
});

describe("Deletion of a blog", () => {
  test("succeeds with valid id", async () => {
    const response = await api.delete("/api/blogs/5a422a851b54a676234d17f7");
    expect(response.status).toBe(204);
  });
});

describe("Updating a blog", () => {
  test("succeeds with valid data", async () => {
    const blogId = "5a422a851b54a676234d17f7";
    await api.put(`/api/blogs/${blogId}`).send(helper.updatedBlogData);
    const response = await api.get("/api/blogs");
    const blog = response.body.find(blog => blog.id === blogId);
    expect(blog.likes).toBe(10);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
