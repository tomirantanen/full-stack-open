import React from "react";
import { useQuery } from "@apollo/react-hooks";

import BooksTable from "./BooksTable";
import { BOOKS_BY_GENRE } from "../graphql";

const Recommend = ({ user, show }) => {
  const genre = !user || user.loading ? "" : user.data.me.favoriteGenre;
  const recommendedBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre }
  });
  if (!show) {
    return null;
  }

  if (user.loading || recommendedBooks.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      {recommendedBooks ? (
        <BooksTable books={recommendedBooks.data.allBooks} />
      ) : null}
    </div>
  );
};

export default Recommend;
