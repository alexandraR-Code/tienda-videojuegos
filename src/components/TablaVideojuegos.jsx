import './TablaVideojuegos.css'

function TablaVideojuegos({videojuegos}){
    return (
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
                </tr>
            </thead>
            <tbody>
                {videojuegos.map((juego)=>(
                    <tr key={juego.id}>
                        <td data-label="Título">{juego.titulo}</td>
                        <td data-label="Género">{juego.genero}</td>
                        <td data-label="Plataforma">{juego.plataforma}</td>
                        <td data-label="Lanzamiento">{juego.lanzamiento}</td>
                        <td data-label="Precio">${juego.precio}</td>
                        <td data-label="Disponible">{juego.disponible ? 'Sí' : 'No'}</td>
                        <td data-label="Progreso">
                            <progress value={juego.progreso} max="1"></progress>
                        </td>
                    </tr>
                    ))}
            </tbody>

        </table>
    );
}
export default TablaVideojuegos;