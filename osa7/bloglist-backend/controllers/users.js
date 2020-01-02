const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      url: 1,
      title: 1,
      author: 1
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (body.password === undefined) {
      return response
        .status(400)
        .json({ error: "Missing required field: password" });
    } else if (body.password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
