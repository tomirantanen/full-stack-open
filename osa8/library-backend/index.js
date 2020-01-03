const { ApolloServer, gql } = require("apollo-server");
const uuidv4 = require("uuid/v4");

const config = require("./utils/config");
const Book = require("./models/book");
const Author = require("./models/author");

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]!
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

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
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: author => Book.find({ author }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author });
      if (author) {
        const book = new Book({ ...args, author });
        return book.save();
      } else {
        const newAuthor = new Author({ name: args.author });
        const savedAuthor = await newAuthor.save();
        const book = new Book({ ...args, author: savedAuthor });
        return book.save();
      }
    },
    editAuthor: (root, args) =>
      Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo })
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: config.PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
