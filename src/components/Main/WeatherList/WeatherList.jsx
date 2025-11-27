import React, { useEffect, useState} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import WeatherCard from "./WeatherCard/WeatherCard";
import './WeatherList.css';
import { ThreeDots } from 'react-loader-spinner'

const WeatherList = () => {
  const apiKey = import.meta.env.VITE_MY_API_KEY;

  const [value, setValue] = useState("Madrid");
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState("Madrid");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${apiKey}&lang=es`
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setPosts(res.data.list);
        setCity(res.data.city.name);
      } catch (e) {
        setPosts([]);
        setCity("");
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

  if (!posts.length) return (
    <div className="spinner-center">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );

  return (
    <section className="weatherlist">
      <h1>Tiempo en tu ciudad</h1>
      <form onSubmit={handleSubmit}>
        <input name="city"/>
        <button>Buscar</button>
      </form>
      
      {city && <h2>Tiempo en {city}</h2>}

      <ul className='cities'>
        {renderCards()}
      </ul>
    </section>
  );
};

export default WeatherList;