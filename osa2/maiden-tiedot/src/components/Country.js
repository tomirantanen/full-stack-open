import React from "react";
import Weather from "./Weather";
import Languages from "./Languages";

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>{`Capital ${country.capital}`}</p>
      <p>{`Population ${country.population}`}</p>
      <h2>Languages</h2>
      <Languages languages={country.languages} />
      <img src={country.flag} alt={`${country.demonym} flag`}></img>
      <Weather city={country.capital} />
    </>
  );
};

export default Country;
