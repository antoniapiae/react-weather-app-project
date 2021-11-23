import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";

import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function search() {
    const apiKey = "1510dfa5c43bdbc339577a5b29c2fc63";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="weather-app-wrapper">
          <div className="weather-app">
            <WeatherInfo data={weatherData} />
            <form id="search-form" className="mb-3" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-7">
                  <input
                    type="search"
                    placeholder="Type a city..."
                    className="form-control"
                    id="city-input"
                    autoFocus="on"
                    autoComplete="off"
                    onChange={handleCityChange}
                  />
                </div>
                <div className="col-3">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark w-100"
                  />
                </div>
                <div className="col-2">
                  <input
                    type="submit"
                    value="Current"
                    className="btn btn-dark w-100"
                    id="current"
                  />
                </div>
              </div>
            </form>
            <hr />
            <WeatherForecast coordinates={weatherData.coordinates} />
            <div class="weather-forecast" id="forecast"></div>
            <small class="source">
              <a
                href="https://github.com/antoniapiae/react-weather-app-project"
                target="_blank"
                rel="noreferrer"
              >
                Open-source code{" "}
              </a>
              by Antonia Englert
            </small>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
