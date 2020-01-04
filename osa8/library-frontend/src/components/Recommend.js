import React from "react";

import BooksTable from "./BooksTable";

const Recommend = ({ user, show, books }) => {
  if (!show) {
    return null;
  }

  if (user.loading || books.loading) {
    return <div>loading...</div>;
  }

  const booksByGenre = books.data.allBooks.filter(book =>
    book.genres.includes(user.data.me.favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <b>{user.data.me.favoriteGenre}</b>
      </p>
      {books ? <BooksTable books={booksByGenre} /> : null}
    </div>
  );
};

export default Recommend;
