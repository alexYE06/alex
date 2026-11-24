import TarjetaLibro from './TarjetaLibro';

export default function ListaLibros({ libros }) {
  if (libros.length === 0) {
    return <div className="alert alert-warning">No se encontraron libros con ese filtro.</div>;
  }

  return (
    <div className="row g-3">
      {libros.map((libro) => (
        <div className="col-md-4" key={libro.id}>
          <TarjetaLibro libro={libro} />
        </div>
      ))}
    </div>
  );
}
