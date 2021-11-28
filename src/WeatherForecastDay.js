import React from "react";

export default function WeatherForecastDay(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function maxTemperature() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°`;
  }

  function minTemperature() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }

  return (
    <div>
      <div className="WeatherForecast-day">{day()}</div>
      <img
        src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
        alt=""
        id="icon"
        className="float-left"
      />
      <div className="WeatherForecast-temperatures">
        <span className="WeatherForecast-temperatures-max">
          {maxTemperature()}
        </span>
        <span className="WeatherForecast-temperatures-min">
          {minTemperature()}
        </span>
      </div>
    </div>
  );
}
