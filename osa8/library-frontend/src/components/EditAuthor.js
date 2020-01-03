import React, { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_AUTHOR, ALL_AUTHORS } from "../graphql";

const EditAuthor = ({ authors, handleError }) => {
  const [born, setBorn] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState({});

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    onError: handleError,
    variables: { name: selectedAuthor.value, born },
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = event => {
    event.preventDefault();
    updateAuthor();
    setBorn("");
  };

  const authorChanged = selected => {
    setSelectedAuthor(selected);
  };

  const options = authors.map(author => ({
    value: author.name,
    label: author.name
  }));

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedAuthor}
          onChange={authorChanged}
          options={options}
        />
        <div>
          Born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
