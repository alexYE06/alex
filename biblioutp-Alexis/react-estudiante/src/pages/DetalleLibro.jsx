import { Link, useParams } from 'react-router-dom';
import BadgeDisponible from '../components/BadgeDisponible';
import { useTitulo } from '../hooks/useTitulo';

export default function DetalleLibro({ libros }) {
  const { id } = useParams();
  const libro = libros.find((l) => l.id === Number(id));
  useTitulo(libro ? libro.titulo : 'Libro no encontrado');

  if (!libro) {
    return (
      <div className="alert alert-danger">
        <h4>Libro no encontrado</h4>
        <Link to="/catalogo" className="btn btn-secondary mt-2">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="card p-4" style={{ maxWidth: '600px' }}>
      <h3>{libro.titulo}</h3>
      <p className="mb-1"><strong>Autor:</strong> {libro.autor}</p>
      <p className="mb-1"><strong>ISBN:</strong> {libro.isbn}</p>
      <p className="mb-1"><strong>Categoría:</strong> {libro.categoria}</p>
      <p className="mb-3"><strong>Año:</strong> {libro.anio}</p>
      <div className="mb-3"><BadgeDisponible disponible={libro.disponible} /></div>
      <Link to="/catalogo" className="btn btn-outline-secondary">Volver</Link>
    </div>
  );
}
