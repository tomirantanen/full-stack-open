import React from "react";

const Books = ({ show, books }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Books</h2>

      {books.loading ? (
        <p>Loading books...</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {books.data.allBooks.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
