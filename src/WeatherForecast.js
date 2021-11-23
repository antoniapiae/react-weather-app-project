import React from "react";
import axios from "axios";

import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  function handleResponse(response) {
    console.log(response.data);
  }

  let apiKey = `1510dfa5c43bdbc339577a5b29c2fc63`;
  let latitude = props.coordinates.lat;
  let longitude = props.coordinates.lon;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(handleResponse);

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <div className="WeatherForecast-day">Wed</div>
          <img
            src="http://openweathermap.org/img/wn/01n@2x.png"
            alt=""
            id="icon"
            className="float-left"
          />
          <div className="WeatherForecast-temperatures">
            <span className="WeatherForecast-temperatures-max">9°</span>
            <span className="WeatherForecast-temperatures-min">6°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
