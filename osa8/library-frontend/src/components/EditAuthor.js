import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { UPDATE_AUTHOR, ALL_AUTHORS } from "../graphql";

const EditAuthor = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    variables: { name, born },
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const submit = event => {
    event.preventDefault();
    updateAuthor(name, born);
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
