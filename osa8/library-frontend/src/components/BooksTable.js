import React from "react";

const BooksTable = ({ books }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>Author</th>
        <th>Published</th>
      </tr>
      {books.map(book => (
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BooksTable;
