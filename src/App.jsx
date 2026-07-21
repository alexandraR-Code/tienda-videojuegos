import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./data/videojuegos";
import TablaVideojuegos from "./components/TablaVideojuegos";
import FormularioVideojuego from "./components/FormularioVideojuego";
import Navbar from "./components/Navbar";
import PaginaNoEncontrada from "./components/PaginaNoEncontrada";
import AlertaNotificacion from "./components/AlertaNotificacion";

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem("lista_videojuegos");
    return datosGuardados ? JSON.parse(datosGuardados) : data;
  });
  const [mensajeToast, setMensajeToast] = useState("");

  useEffect(() => {
    localStorage.setItem("lista_videojuegos", JSON.stringify(videojuegos));
  }, [videojuegos]);

  function agregar(videojuego) {
    setVideojuegos([...videojuegos, videojuego]);
    setMensajeToast("Videojuego agregado con éxito");
  }

  function eliminar(id) {
    setVideojuegos(videojuegos.filter((v) => v.id !== id));
    setMensajeToast("Videojuego eliminado con éxito");
  }

  function editar(videojuegoActualizado) {
    setVideojuegos(
      videojuegos.map((v) => v.id === videojuegoActualizado.id ? videojuegoActualizado : v
      )
    );
    setMensajeToast("Videojuego actualizado con éxito");
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
      {mensajeToast && (
        <AlertaNotificacion mensaje={mensajeToast} onCerrar={() => setMensajeToast("")} />
      )}
      <Routes>
        <Route path="/" element={<TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminar} />} />
        <Route path="/formulario" element={<FormularioVideojuego onGuardar={onGuardar}/>}/>
        <Route path="*" element={<PaginaNoEncontrada/>}/>
      </Routes>

    </div>
  );
}

export default App;