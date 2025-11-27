import React from "react";
import './WeatherCard.css';

const WeatherCard = ({data}) => {

  const getTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <li className="weather-card">
      <div className="time">{getTime(data.dt)}</div>
      <div className="temp">{Math.round(data.main.temp)}°C</div>
      <img 
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
      <div className="description">{data.weather[0].description}</div>
    </li>
  );
};

export default WeatherCard;