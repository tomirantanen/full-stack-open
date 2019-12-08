import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const visibleCountries =
    searchValue !== ""
      ? countries.filter(country =>
          country.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      : countries;

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const searchValueChanged = event => {
    setSearchValue(event.target.value);
  };

  const showCountry = country => {
    setSearchValue(country.name);
  };

  return (
    <div>
      <p>find countries</p>
      <input value={searchValue} onChange={searchValueChanged} />
      <Countries countries={visibleCountries} showCountry={showCountry} />
    </div>
  );
};

export default App;
