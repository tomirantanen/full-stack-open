import React from "react";

const Person = ({ person, handlePersonDelete }) => {
  return (
    <li>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => handlePersonDelete(person)}>delete</button>
    </li>
  );
};

export default Person;
