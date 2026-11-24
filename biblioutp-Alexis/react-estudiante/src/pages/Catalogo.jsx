import { useState } from 'react';
import ListaLibros from '../components/ListaLibros';
import { useTitulo } from '../hooks/useTitulo';

export default function Catalogo({ libros }) {
  useTitulo('Catálogo');
  const [categoria, setCategoria] = useState('');
  const [texto, setTexto] = useState('');

  const categoriasUnicas = [...new Set(libros.map((l) => l.categoria))];

  const librosFiltrados = libros.filter((l) => {
    const coincideCat = !categoria || l.categoria === categoria;
    const q = texto.toLowerCase();
    const coincideTexto =
      l.titulo.toLowerCase().includes(q) || l.autor.toLowerCase().includes(q);
    return coincideCat && coincideTexto;
  });

  return (
    <div>
      <h2 className="mb-3">Catálogo de Libros</h2>
      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categoriasUnicas.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título o autor..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
        </div>
      </div>
      <ListaLibros libros={librosFiltrados} />
    </div>
  );
}
