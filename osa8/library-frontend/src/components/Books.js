import React, { useState } from "react";
import { uniq, flatten } from "lodash";
import BooksTable from "./BooksTable";

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState("");
  if (!show) {
    return null;
  }

  const genres = () =>
    uniq(flatten(books.data.allBooks.map(book => book.genres)));

  const visibleBooks = genre
    ? books.data.allBooks.filter(book => book.genres.includes(genre))
    : books.data.allBooks;

  return (
    <div>
      <h2>Books</h2>

      {books.loading ? (
        <p>Loading books...</p>
      ) : (
        <>
          {genre ? (
            <p>
              In genre <b>{genre}</b>
            </p>
          ) : (
            <p>In all genres</p>
          )}
          <BooksTable books={visibleBooks} />
          {genres().map(genre => (
            <button onClick={() => setGenre(genre)} key={genre}>
              {genre}
            </button>
          ))}
          <button onClick={() => setGenre("")}>All genres</button>
        </>
      )}
    </div>
  );
};

export default Books;
