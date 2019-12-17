const User = require("../models/user");
const helper = require("./test-helper");
const app = require("../app");
const supertest = require("supertest");

const api = supertest(app);

describe("When there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "sekret" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "luser",
      name: "Last user",
      password: "pass"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails if the username exists already", async () => {
    const newUser = {
      username: "root",
      name: "second root user",
      password: "password"
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toStrictEqual({
      error:
        "User validation failed: username: Error, expected `username` to be unique. Value: `root`"
    });
  });
});

describe("Creating a new user", () => {
  test("fails if the password is shorter than 3 character", async () => {
    const newUser = {
      username: "root",
      name: "second root user",
      password: "pa"
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toStrictEqual({
      error: "Password must be at least 3 characters long"
    });
  });

  test("fails if the username is missing", async () => {
    const newUser = {
      name: "second root user",
      password: "password"
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toStrictEqual({
      error: "User validation failed: username: Path `username` is required."
    });
  });

  test("fails if the password is missing", async () => {
    const newUser = {
      username: "root",
      name: "second root user"
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toStrictEqual({
      error: "Missing required field: password"
    });
  });
});
