import { Link } from 'react-router-dom';
import { useTitulo } from '../hooks/useTitulo';

export default function NoEncontrado() {
  useTitulo('404');
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p>Página no encontrada.</p>
      <Link to="/" className="btn btn-primary">Ir al inicio</Link>
    </div>
  );
}
