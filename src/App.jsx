import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./data/videojuegos";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";

function App() {
  const [videojuegos, setVideojuegos] = useState(data);
  function agregar(videojuego) {
    setVideojuegos([...videojuegos, videojuego]);
  }

  function eliminar(id) {
    setVideojuegos(videojuegos.filter((v) => v.id !== id));
  }

  function editar(videojuegoActualizado) {
    setVideojuegos(
      videojuegos.map((v) => v.id === videojuegoActualizado.id ? videojuegoActualizado : v
      )
    );

  }

  function onGuardar(videojuego){
    const existe = videojuegos.some((v)=> v.id === videojuego.id);
    if(existe){
      editar(videojuego);
    }else{
      agregar(videojuego);
    }
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminar} />} />
        <Route path="/formulario" element={<FormularioVideojuego onGuardar={onGuardar}/>}/>
        <Route path="*" element={<PaginaNoEncontrada/>}/>
      </Routes>

    </div>
  );
}

export default App;