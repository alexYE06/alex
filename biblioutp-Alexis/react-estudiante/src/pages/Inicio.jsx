import { Link } from 'react-router-dom';
import { useTitulo } from '../hooks/useTitulo';

export default function Inicio() {
  useTitulo('Inicio');
  return (
    <div className="p-4 bg-light rounded-3">
      <h1>Bienvenido a BiblioUTP</h1>
      <p className="lead">Consulta nuestro catálogo universitario y solicita tus préstamos en línea.</p>
      <Link to="/catalogo" className="btn btn-primary">Explorar Catálogo</Link>
    </div>
  );
}
