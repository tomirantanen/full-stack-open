import { gql } from "apollo-boost";

const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      id
    }
    id
    genres
  }
`;

const ALL_GENRES = gql`
  query {
    allGenres
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

const USER = gql`
  {
    me {
      username
      favoriteGenre
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
      author {
        name
      }
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

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`;

export {
  BOOKS_BY_GENRE,
  ALL_GENRES,
  ALL_AUTHORS,
  CREATE_BOOK,
  UPDATE_AUTHOR,
  LOGIN,
  USER,
  BOOK_ADDED
};
