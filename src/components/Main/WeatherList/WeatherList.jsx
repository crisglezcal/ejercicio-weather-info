// 1. IMPORTACIÓN DE DEPENDENCIAS
import React, { useEffect, useState} from "react"; // React hooks
import { v4 as uuidv4 } from "uuid"; // UUID generator para keys únicas
import axios from 'axios'; // HTTP client para peticiones a APIs
import WeatherCard from "./WeatherCard/WeatherCard"; // Componente hijo
import './WeatherList.css'; // Estilos del componente
import { ThreeDots } from 'react-loader-spinner' // Componente de spinner

// 2. DECLARACIÓN DEL COMPONENTE PRINCIPAL
const WeatherList = () => {
  // 3. VARIABLE DE ENTORNO
  const apiKey = import.meta.env.VITE_MY_API_KEY;

  // 4. DECLARACIÓN DE ESTADOS CON HOOKS (INITIAL STATE)
  const [value, setValue] = useState("Madrid"); // Estado para ciudad buscada
  const [posts, setPosts] = useState([]); // Estado para datos del clima (array)
  const [city, setCity] = useState("Madrid"); // Estado para nombre de ciudad actual

  // 5. EFFECT HOOK PARA SIDE EFFECTS
  useEffect(() => {
    // 6. FUNCIÓN ASÍNCRONA INTERNA
    async function fetchData() {
      try {
        // 7. PETICIÓN HTTP A API EXTERNA ("HTTP GET Request")
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=${apiKey}&lang=es`
        );
        
        // 8. SIMULACIÓN DE CARGA ("Promise Delay" = 2 segundos)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // 9. ACTUALIZACIÓN DE ESTADO CON DATOS DE API ("State Update")
        setPosts(res.data.list); // Array de pronósticos
        setCity(res.data.city.name); // Nombre de la ciudad
      } catch (e) {
        // 10. MANEJO DE ERRORES ("Error Handling" en try-catch)
        setPosts([]); // Limpiar datos en caso de error
        setCity(""); // Limpiar ciudad en caso de error
      }
    }

    // 11. EJECUCIÓN DE LA FUNCIÓN (INVOCA A LA FUNCIÓN)
    fetchData();
  }, [value]); // Dependency array: se ejecuta cuando 'value' cambia

  // 12. MANEJAR EVENTO DE FORMULARIO
  const handleSubmit = e => {
    e.preventDefault(); // Prevenir comportamiento por defecto del formulario
    
    // 13. ACCESO A ELEMENTOS DEL FORMULARIO
    const cityValue = e.target.elements.city.value;
    
    // 14. ACTUALIZACIÓN DE ESTADO ("State Update")
    setValue(cityValue);
  };

  // 15. FUNCIÓN PARA RENDERIZAR TARJETAS
  const renderCards = () =>
    posts.map((post) => <WeatherCard data={post} key={uuidv4()} />); // UUID genera keys únicas para cada elemento en la lista
    
  // 16. RENDERIZADO CONDICIONAL - SPINNER
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

  // 17. RENDERIZADO PRINCIPAL DEL COMPONENTE
  return (
    <section className="weatherlist">
      <h1>Tiempo en tu ciudad</h1>
      <form onSubmit={handleSubmit}>
        <input name="city"/>
        <button>Buscar</button>
      </form>
      
      {city && <h2>Tiempo en {city}</h2>}

      {/* 18. LISTA DE TARJETAS DEL CLIMA */}
      <ul className='cities'>
        {renderCards()}
      </ul>
    </section>
  );
};

// 19. EXPORTACIÓN DEL COMPONENTE
export default WeatherList;