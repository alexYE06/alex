import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary px-3 mb-4">
      <NavLink className="navbar-brand fw-bold" to="/">BiblioUTP</NavLink>
      <div className="navbar-nav me-auto">
        <NavLink className="nav-link" to="/catalogo">Catálogo</NavLink>
        {usuario && (
          <>
            <NavLink className="nav-link" to="/mis-prestamos">Mis Préstamos</NavLink>
            <NavLink className="nav-link" to="/nuevo-prestamo">Nuevo Préstamo</NavLink>
          </>
        )}
      </div>
      <div>
        {usuario ? (
          <div className="d-flex align-items-center gap-2 text-white">
            <span className="small">{usuario.nombre}</span>
            <button onClick={salir} className="btn btn-sm btn-light">Salir</button>
          </div>
        ) : (
          <NavLink className="btn btn-sm btn-light" to="/login">Iniciar sesión</NavLink>
        )}
      </div>
    </nav>
  );
}
