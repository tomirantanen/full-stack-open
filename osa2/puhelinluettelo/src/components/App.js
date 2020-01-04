import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import AddPersonForm from "./AddPersonForm";
import PersonList from "./PersonList";
import personService from "./../services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getPersons()
      .then(persons => setPersons(persons))
      .catch(error => {
        console.log(error);
        notify("Could not load persons", "error");
      });
  }, []);

  const visiblePersons =
    filterValue !== ""
      ? persons.filter(person =>
          person.name.toLowerCase().includes(filterValue.toLowerCase())
        )
      : persons;

  /**
   * Display notification message
   * @param {string} message Message to be displayed
   * @param {string} type Type of notification: "info" | "error"
   */
  const notify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = event => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if (!existingPerson) {
      personService
        .createPerson({ name: newName, number: newNumber })
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
          notify(`Added ${createdPerson.name}`, "info");
        })
        .catch(error => {
          console.error(error);
          notify(
            `Could not add ${newName}. ${error.response.data.error}`,
            "error"
          );
        });
    } else {
      const confirm = window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with new one?`
      );

      if (confirm) {
        personService
          .updatePerson({ ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.name !== updatedPerson.name ? person : updatedPerson
              )
            );
            notify(`Updated ${updatedPerson.name} phone number`, "info");
          })
          .catch(error => {
            console.error(error);
            notify(
              `Could not update ${existingPerson.name} phone number`,
              "error"
            );
          });
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleFilterValueChange = event => {
    setFilterValue(event.target.value);
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handlePersonDelete = person => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
          notify(`Deleted ${person.name}`, "info");
        })
        .catch(error => {
          console.error(error);
          notify(`Could not delete ${person.name}`, "error");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        filterValue={filterValue}
        handleFilterValueChange={handleFilterValueChange}
      />
      <h2>Add a new</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList
        persons={visiblePersons}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
