import React from "react";

const CountriesList = ({ countries, showCountry }) => {
  return countries.map(country => (
    <div key={country.name}>
      <p>{country.name}</p>
      <button onClick={() => showCountry(country)}>show</button>
    </div>
  ));
};

export default CountriesList;
