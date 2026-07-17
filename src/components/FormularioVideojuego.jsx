import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";


function FormularioVideojuego({ onGuardar }) {
    const location = useLocation();
    const navigate = useNavigate();

    const videojuegoEditar = location.state || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(true);
    const [progreso, setProgreso] = useState(0);

    useEffect(() => {
        if (videojuegoEditar) {
            setTitulo(videojuegoEditar.titulo);
            setGenero(videojuegoEditar.genero);
            setPlataforma(videojuegoEditar.plataforma);
            setLanzamiento(videojuegoEditar.lanzamiento);
            setPrecio(videojuegoEditar.precio);
            setDisponible(videojuegoEditar.disponible);
            setProgreso(videojuegoEditar.progreso);
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(true);
            setProgreso(0);
        }

    }, [videojuegoEditar]);

    function manejarGuardar() {
        const videojuego = {
            id: videojuegoEditar ? videojuegoEditar.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso)
        };
        onGuardar(videojuego);
        navigate("/");
    }
    function manejarCancelar() {
        navigate("/")
    }
     return (
            <div className="formulario-page">
                <div className="formulario-card">
                    <h2>{videojuegoEditar ? "Editar videojuego" : "Nuevo videojuego"}</h2>

                    <label className="campo">
                        <span className="campo-label">Título</span>
                        <input
                            className="campo-input"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </label>

                    <label className="campo">
                        <span className="campo-label">Lanzamiento (año)</span>
                        <input
                            className="campo-input"
                            type="number"
                            value={lanzamiento}
                            onChange={(e) => setLanzamiento(e.target.value)}
                        />
                    </label>

                    <label className="campo">
                        <span className="campo-label">Precio</span>
                        <input
                            className="campo-input"
                            type="number"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </label>

                    <label className="campo">
                        <span className="campo-label">Género</span>
                        <input
                            className="campo-input"
                            type="text"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                        />
                    </label>

                    <label className="campo">
                        <span className="campo-label">Plataforma</span>
                        <select
                            className="campo-input"
                            value={plataforma}
                            onChange={(e) => setPlataforma(e.target.value)}
                        >
                            <option value="">Seleccionar una plataforma</option>
                            <option value="PC">PC</option>
                            <option value="PS5">PS5</option>
                            <option value="Xbox Series X">Xbox Series X</option>
                            <option value="Nintendo Switch">Nintendo Switch</option>
                        </select>
                    </label>

                    <label className="campo campo-checkbox">
                        <input
                            type="checkbox"
                            checked={disponible}
                            onChange={(e) => setDisponible(e.target.checked)}
                        />
                        <span className="campo-label">Disponible</span>
                    </label>

                    <label className="campo">
                        <span className="campo-label">Progreso (0 a 1)</span>
                        <input
                            className="campo-input"
                            type="number"
                            step="0.05"
                            min="0"
                            max="1"
                            value={progreso}
                            onChange={(e) => setProgreso(e.target.value)}
                        />
                    </label>

                    <div className="formulario-acciones">
                        <button className="btn btn-editar" type="button" onClick={manejarGuardar}>Guardar</button>
                        <button className="btn btn-cancelar" type="button" onClick={manejarCancelar}>Cancelar</button>
                    </div>
                </div>
            </div>
        );

}

export default FormularioVideojuego;