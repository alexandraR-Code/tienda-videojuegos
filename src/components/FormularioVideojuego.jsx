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
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [errores, setErrores] = useState({});

    useEffect(() => {
        if (videojuegoEditar) {
            setTitulo(videojuegoEditar.titulo);
            setGenero(videojuegoEditar.genero);
            setPlataforma(videojuegoEditar.plataforma);
            setLanzamiento(videojuegoEditar.lanzamiento);
            setPrecio(videojuegoEditar.precio);
            setDisponible(videojuegoEditar.disponible);
            setProgreso(videojuegoEditar.progreso);
            setFechaLanzamiento(videojuegoEditar.fechaLanzamiento || "");
            setSinopsis(videojuegoEditar.sinopsis || "");
            setCalificacion(videojuegoEditar.calificacion ?? "");
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("");
            setLanzamiento("");
            setPrecio("");
            setDisponible(true);
            setProgreso(0);
            setFechaLanzamiento("");
            setSinopsis("");
            setCalificacion("");
        }

    }, [videojuegoEditar]);

    function validarFormulario() {
        const erroresActivos = {};

        if (!titulo.trim()) {
            erroresActivos.titulo = "El título no puede estar vacío.";
        }

        if (fechaLanzamiento) {
            const hoy = new Date().toISOString().split("T")[0];
            if (fechaLanzamiento > hoy) {
                erroresActivos.fechaLanzamiento = "La fecha no puede ser futura.";
            }
        }

        const sinopsisLimpia = sinopsis.trim();
        if (sinopsisLimpia.length < 10) {
            erroresActivos.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
        } else if (sinopsisLimpia.length > 250) {
            erroresActivos.sinopsis = "La sinopsis no puede superar los 250 caracteres.";
        }

        const nota = Number(calificacion);
        if (calificacion === "" || nota < 1 || nota > 100) {
            erroresActivos.calificacion = "La calificación debe estar entre 1 y 100.";
        }

        return erroresActivos;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const erroresActivos = validarFormulario();

        if (Object.keys(erroresActivos).length > 0) {
            setErrores(erroresActivos);
            return;
        }

        setErrores({});
        manejarGuardar();
    }

    function manejarGuardar() {
        const videojuego = {
            id: videojuegoEditar ? videojuegoEditar.id : Date.now(),
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: Number(lanzamiento),
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso),
            fechaLanzamiento: fechaLanzamiento,
            sinopsis: sinopsis,
            calificacion: Number(calificacion)
        };
        onGuardar(videojuego);
        navigate("/");
    }
    function manejarCancelar() {
        navigate("/")
    }
     return (
            <div className="formulario-page">
                <form className="formulario-card" onSubmit={handleSubmit} noValidate>
                    <h2>{videojuegoEditar ? "Editar videojuego" : "Nuevo videojuego"}</h2>

                    <label className="campo">
                        <span className="campo-label">Título</span>
                        <input
                            className="campo-input"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                        {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
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
                        <span className="campo-label">Fecha de lanzamiento</span>
                        <input
                            className="campo-input"
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            value={fechaLanzamiento}
                            onChange={(e) => setFechaLanzamiento(e.target.value)}
                        />
                        {errores.fechaLanzamiento && <span className="error-mensaje">{errores.fechaLanzamiento}</span>}
                    </label>

                    <label className="campo">
                        <span className="campo-label">Sinopsis</span>
                        <textarea
                            className="campo-textarea"
                            maxLength={250}
                            value={sinopsis}
                            onChange={(e) => setSinopsis(e.target.value)}
                        />
                        {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
                    </label>

                    <label className="campo">
                        <span className="campo-label">Calificación de la crítica (1-100)</span>
                        <input
                            className="campo-input"
                            type="number"
                            min="1"
                            max="100"
                            value={calificacion}
                            onChange={(e) => setCalificacion(e.target.value)}
                        />
                        {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
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
                        <button className="btn btn-editar" type="submit">Guardar</button>
                        <button className="btn btn-cancelar" type="button" onClick={manejarCancelar}>Cancelar</button>
                    </div>
                </form>
            </div>
        );

}

export default FormularioVideojuego;