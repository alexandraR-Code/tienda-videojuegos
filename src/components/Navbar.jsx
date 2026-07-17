import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar(){
    return(
        <nav className="navbar">
            <h1 className="navbar-titulo">Tienda de videojuegos</h1>
            <div className="navbar-links">
                <Link to="/">Inventario</Link>
                <Link to="/formulario">Nuevo juego</Link>
            </div>
        </nav>
    );
}

export default Navbar;
