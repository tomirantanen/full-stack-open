import React from "react";
import EditAuthor from "./EditAuthor";

const Authors = ({ show, authors }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Authors</h2>
      {authors.loading ? (
        <p>Loading authors...</p>
      ) : (
        <>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>Born</th>
                <th>Books</th>
              </tr>
              {authors.data.allAuthors.map(author => (
                <tr key={author.name}>
                  <td>{author.name}</td>
                  <td>{author.born}</td>
                  <td>{author.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <EditAuthor authors={authors.data.allAuthors} />
        </>
      )}
    </div>
  );
};

export default Authors;
