import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  return (
    <div className="WeatherInfo">
      <div className="overview">
        <h1 id="city">{props.data.city}</h1>
        <ul>
          <li>
            Last updated:{" "}
            <span id="date">
              <FormattedDate date={props.data.date} />
            </span>
          </li>
          <li id="condition">{props.data.description}</li>
        </ul>
      </div>
      <div className="row current-temperature">
        <div className="col-6">
          <div className="clearfix weather-temperature">
            <img
              src={props.data.iconUrl}
              alt=""
              id="icon"
              className="float-left"
            />
            <WeatherTemperature celsius={props.data.temperature} />
          </div>
        </div>
        <div class="col-6">
          <ul>
            <li>
              Humidity: <span id="humidity">{props.data.humidity}</span>%
            </li>
            <li>
              Wind: <span id="wind">{Math.round(props.data.wind)}</span> km/h
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
