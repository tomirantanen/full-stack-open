import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS } from "./graphql";

const App = () => {
  const [page, setPage] = useState("authors");
  const books = useQuery(ALL_BOOKS);
  const authors = useQuery(ALL_AUTHORS);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        <button onClick={() => setPage("add")}>Add book</button>
      </div>
      <Authors authors={authors} show={page === "authors"} />
      <Books books={books} show={page === "books"} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
