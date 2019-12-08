import React from "react";
import Person from "./Person";

const PersonList = ({ persons, handlePersonDelete }) => {
  return (
    <ul>
      {persons.map(person => (
        <Person
          key={person.name}
          person={person}
          handlePersonDelete={handlePersonDelete}
        />
      ))}
    </ul>
  );
};

export default PersonList;
