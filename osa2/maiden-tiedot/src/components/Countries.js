import React from "react";
import Country from "./Country";
import CountriesList from "./CountriesList";

const Countries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />;
  } else {
    return <CountriesList countries={countries} showCountry={showCountry} />;
  }
};

export default Countries;
