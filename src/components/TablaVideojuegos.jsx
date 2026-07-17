import './TablaVideojuegos.css'
import { Link } from 'react-router-dom';

function TablaVideojuegos({ videojuegos, onEliminar }) {
    return (
        <div className="tabla-page">
            <div className="tabla-page-header">
                <h2>Inventario</h2>
                <span className="tabla-contador">{videojuegos.length} videojuegos</span>
            </div>
            <table className="tabla-videojuegos">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Género</th>
                        <th>Plataforma</th>
                        <th>Lanzamiento</th>
                        <th>Precio</th>
                        <th>Disponible</th>
                        <th>Progreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {videojuegos.map((juego) => (
                        <tr key={juego.id}>
                            <td data-label="Título">{juego.titulo}</td>
                            <td data-label="Género">{juego.genero}</td>
                            <td data-label="Plataforma">{juego.plataforma}</td>
                            <td data-label="Lanzamiento">{juego.lanzamiento}</td>
                            <td data-label="Precio">${juego.precio}</td>
                            <td data-label="Disponible">
                                <span className={`badge ${juego.disponible ? 'badge-si' : 'badge-no'}`}>
                                    {juego.disponible ? 'Sí' : 'No'}
                                </span>
                            </td>
                            <td data-label="Progreso">
                                <progress value={juego.progreso} max="1"></progress>
                            </td>
                            <td data-label="Acciones">
                                <div className="acciones-grupo">
                                    <Link className="btn btn-editar" to="/formulario" state={juego}>Editar</Link>
                                    <button className="btn btn-eliminar" onClick={() => onEliminar(juego.id)}>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TablaVideojuegos;