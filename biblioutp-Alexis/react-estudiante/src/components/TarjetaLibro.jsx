import { Link, useNavigate } from 'react-router-dom';
import BadgeDisponible from './BadgeDisponible';

export default function TarjetaLibro({ libro }) {
  const navigate = useNavigate();

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{libro.titulo}</h5>
          <BadgeDisponible disponible={libro.disponible} />
        </div>
        <p className="card-text text-muted mb-1">Autor: {libro.autor}</p>
        <p className="card-text small mb-3">{libro.categoria} • {libro.anio}</p>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/catalogo/${libro.id}`} className="btn btn-outline-primary btn-sm">
            Ver detalle
          </Link>
          <button
            className="btn btn-primary btn-sm"
            disabled={!libro.disponible}
            onClick={() => navigate(`/nuevo-prestamo?libroId=${libro.id}`)}
          >
            Pedir préstamo
          </button>
        </div>
      </div>
    </div>
  );
}
