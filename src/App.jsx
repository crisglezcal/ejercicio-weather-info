import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header' // Importar el componente 👶🏽 hijo (Header) al componente 🧔🏽‍♂️ padre (App)
import Main from './components/Main' // Importar el componente 👶🏽 hijo (Main) al componente 🧔🏽‍♂️ padre (App)
import Footer from './components/Footer' // Importar el componente 👶🏽 hijo (Footer) al componente 🧔🏽‍♂️ padre (App)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Main/>
      <Footer/>
    </>
  )
}

export default App
