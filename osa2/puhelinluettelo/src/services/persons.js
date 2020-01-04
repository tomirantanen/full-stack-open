import axios from "axios";
const url = "/persons";

const getPersons = () => {
  const request = axios.get(url);
  return request.then(response => response.data);
};

const createPerson = person => {
  const request = axios.post(url, person);
  return request.then(response => response.data);
};

const updatePerson = person => {
  const request = axios.put(`${url}/${person.id}`, person);
  return request.then(response => response.data);
};

const deletePerson = person => axios.delete(`${url}/${person.id}`);

export default { getPersons, createPerson, updatePerson, deletePerson };
