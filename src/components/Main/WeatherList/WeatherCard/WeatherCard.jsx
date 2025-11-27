// 1. IMPORTACIÓN DE MÓDULOS
import React from "react"; // Importa React desde la librería react
import './WeatherCard.css'; // Importa los estilos CSS específicos para este componente

// 2. DECLARACIÓN DEL COMPONENTE FUNCIONAL: Define un componente funcional de React llamado WeatherCard
const WeatherCard = ({data}) => { // {data} es la "prop" que recibe el componente (desestructuración)
  
  // 3. FUNCIÓN AUXILIAR (getDateTime): Convierte timestamp de segundos a milisegundos y crea objeto Date
  const getDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    
    // 4. FORMATEO DE FECHA
    const day = date.toLocaleDateString('es-ES', {
      weekday: 'long',    // Día de la semana completo (ej: "lunes")
      day: 'numeric',     // Día del mes (ej: "15")
      month: 'long'       // Mes completo (ej: "enero")
    });
    
    // 5. FORMATEO DE HORA
    const time = date.toLocaleTimeString('es-ES', { 
      hour: '2-digit',    // Hora en 2 dígitos (ej: "14")
      minute: '2-digit'   // Minutos en 2 dígitos (ej: "30")
    });

    // 6. RETORNO DE OBJETO
    return { day: day, time: time };
  };

  // 7. EJECUCIÓN DE LA FUNCIÓN AUXILIAR (INVOCA LA FUNCIÓN)
  const dateTime = getDateTime(data.dt); // data.dt es el timestamp de la API de OpenWeatherMap
  
  // 8. RENDERIZADO DEL COMPONENTE 
  return (

    <li className="weather-card">
      <h3 className="date">{dateTime.day}</h3>
      <div className="time">{dateTime.time}</div>
      <div className="temp">{Math.round(data.main.temp)}°C</div>
      <img 
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt={data.weather[0].description}
      />
      <div className="description">{data.weather[0].description}</div>
    </li>
  );
};

// 9. EXPORTACIÓN DEL COMPONENTE
export default WeatherCard;