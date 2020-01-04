import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import BooksTable from "./BooksTable";
import { BOOKS_BY_GENRE, ALL_GENRES } from "../graphql";

const Books = ({ show }) => {
  const [genre, setGenre] = useState("");
  const visibleBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre }
  });
  const genreResponse = useQuery(ALL_GENRES);
  if (!show) {
    return null;
  }

  const genres =
    genreResponse.loading || !genreResponse ? [] : genreResponse.data.allGenres;

  return (
    <div>
      <h2>Books</h2>

      {visibleBooks.loading ? (
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
          <BooksTable books={visibleBooks.data.allBooks} />
          {genres.map(genre => (
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
