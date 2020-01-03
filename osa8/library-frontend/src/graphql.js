import { gql } from "apollo-boost";

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      published
      author
      id
      genres
    }
  }
`;

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      id
      genres
    }
  }
`;

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
    }
  }
`;

export { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK, UPDATE_AUTHOR };
