const {
  ApolloServer,
  UserInputError,
  AuthenticationError
} = require("apollo-server");
const jwt = require("jsonwebtoken");

const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const typeDefs = require("./schema");

const resolvers = {
  Query: {
    hello: () => "world",
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let searchConditions = args.genre ? { genres: args.genre } : null;
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        searchConditions = { ...searchConditions, author };
      }
      return Book.find({ ...searchConditions }).populate("author");
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    }
  },
  Author: {
    bookCount: author => Book.find({ author }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      const author = await Author.findOne({ name: args.author });

      if (author) {
        const book = new Book({ ...args, author });
        try {
          return await book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      } else {
        const newAuthor = new Author({ name: args.author });
        try {
          const savedAuthor = await newAuthor.save();
          const book = new Book({ ...args, author: savedAuthor });
          return await book.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }
    },
    editAuthor: (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      );
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, config.JWT_SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen({ port: config.PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
