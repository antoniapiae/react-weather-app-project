import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";

import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      iconUrl: "http://openweathermap.org/img/wn/04d@2x.png",
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="weather-app-wrapper">
          <div className="weather-app">
            <div className="overview">
              <h1 id="city">{weatherData.city}</h1>
              <ul>
                <li>
                  Last updated:{" "}
                  <span id="date">
                    <FormattedDate date={weatherData.date} />
                  </span>
                </li>
                <li id="condition">{weatherData.description}</li>
              </ul>
            </div>
            <div className="row current-temperature">
              <div className="col-6">
                <div className="clearfix weather-temperature">
                  <img
                    src={weatherData.iconUrl}
                    alt=""
                    id="icon"
                    className="float-left"
                  />

                  <strong id="temperature">
                    {Math.round(weatherData.temperature)}
                  </strong>
                  <span className="units"> °C</span>
                </div>
              </div>
              <div class="col-6">
                <ul>
                  <li>
                    Humidity: <span id="humidity">{weatherData.humidity}</span>%
                  </li>
                  <li>
                    Wind: <span id="wind">{Math.round(weatherData.wind)}</span>{" "}
                    km/h
                  </li>
                </ul>
              </div>
            </div>
            <form id="search-form" className="mb-3">
              <div className="row">
                <div className="col-7">
                  <input
                    type="search"
                    placeholder="Type a city..."
                    className="form-control"
                    id="city-input"
                    autoFocus="on"
                    autoComplete="off"
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
    const apiKey = "1510dfa5c43bdbc339577a5b29c2fc63";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleResponse);

    return "Loading...";
  }
}
