import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription
} from "@apollo/react-hooks";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { ALL_AUTHORS, LOGIN, USER, BOOK_ADDED } from "./graphql";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    setToken(window.localStorage.getItem("library-user-token"));
  }, []);

  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    window.location.reload();
  };

  const user = useQuery(USER);
  const authors = useQuery(ALL_AUTHORS);
  const [login] = useMutation(LOGIN, { onError: handleError });
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(
        `A new book ${subscriptionData.data.bookAdded.title} has been added to library collection`
      );
    }
  });

  const errorNotification = () =>
    errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>;

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>Authors</button>
        <button onClick={() => setPage("books")}>Books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>Add book</button>
            <button onClick={() => setPage("recommend")}>Recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>Login</button>
        )}
      </div>
      {errorNotification()}
      <Authors
        handleError={handleError}
        authors={authors}
        show={page === "authors"}
      />
      <Books show={page === "books"} />
      {token ? (
        <>
          <NewBook show={page === "add"} />
          <Recommend user={user} show={page === "recommend"} />
        </>
      ) : (
        <Login
          login={login}
          setToken={token => setToken(token)}
          show={page === "login"}
        />
      )}
    </div>
  );
};

export default App;
