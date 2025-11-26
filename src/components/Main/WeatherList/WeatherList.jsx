import React, { useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
import WeatherCard from "./WeatherCard/WeatherCard";
import './WeatherList.css';

const WeatherList = () => {
  const apiKey = import.meta.env.VITE_MY_API_KEY;

  const [value, setValue] = useState("Madrid");
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState("Madrid"); // Inicializar con Madrid
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${apiKey}&lang=es`
        );
        setPosts(res.data.list);
        setCity(res.data.city.name);
      } catch (e) {
        setPosts([]);
        setCity(""); // IMPORTANTE: limpiar city cuando hay error
      }
    }

    fetchData();
  }, [value]); 

  const handleSubmit = e => {
    e.preventDefault();
    const cityValue = e.target.elements.city.value;
    setValue(cityValue);
  };

  const renderCards = () =>
    posts.map((post) => <WeatherCard data={post} key={uuidv4()} />);

  return (
    <section className="weatherlist">
      <h1>Tiempo en tu ciudad</h1>
      <form onSubmit={handleSubmit}>
        <input name="city"/>
        <button>Buscar</button>
      </form>
      
      {/* Mostrar el h2 solo cuando city tenga valor */}
      {city && <h2>Tiempo en {city}</h2>}

      {posts.length !== 0 ? (
        <ul className='cities'>
          {renderCards()}
        </ul>
      ) : ""}
    </section>
  );
};

export default WeatherList;