import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error(error);
        setWeather("");
      });
  }, [city]);

  return weather ? (
    <>
      <h2>{`Weather in ${city}`}</h2>
      <p>{weather.weather[0].description}</p>
      <p>{`Temperature ${weather.main.temp} °C`}</p>
      <p>{`Wind speed ${weather.wind.speed} m/s`}</p>
    </>
  ) : (
    <></>
  );
};

export default Weather;
