import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validarPrestamo } from '../core/validadores.js';
import { puedePrestar } from '../core/estadisticas.js';

export default function FormularioPrestamo({ libros, prestamos, usuarioId, onAgregarPrestamo }) {
  const [searchParams] = useSearchParams();
  const primerCampoRef = useRef(null);

  const [form, setForm] = useState({
    libroId: searchParams.get('libroId') || '',
    fechaPrestamo: '2026-11-22',
    fechaDevolucion: ''
  });
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState('');

  useEffect(() => {
    primerCampoRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setExito('');
    const errs = validarPrestamo(form);
    const libro = libros.find((l) => l.id === Number(form.libroId));

    if (libro && !libro.disponible) {
      errs.libroId = 'El libro seleccionado no está disponible';
    }
    if (!puedePrestar(usuarioId, prestamos)) {
      errs.general = 'Ya tienes 3 préstamos activos';
    }

    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    onAgregarPrestamo({
      libroId: Number(form.libroId),
      fechaPrestamo: form.fechaPrestamo,
      fechaDevolucion: form.fechaDevolucion
    });

    setForm({ libroId: '', fechaPrestamo: '2026-11-22', fechaDevolucion: '' });
    setExito('Préstamo registrado con éxito.');
    primerCampoRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '480px' }}>
      {errores.general && <div className="alert alert-danger">{errores.general}</div>}
      {exito && <div className="alert alert-success">{exito}</div>}

      <div className="mb-3">
        <label className="form-label">Libro</label>
        <select
          ref={primerCampoRef}
          className="form-select"
          value={form.libroId}
          onChange={(e) => setForm({ ...form, libroId: e.target.value })}
        >
          <option value="">Selecciona un libro...</option>
          {libros.map((l) => (
            <option key={l.id} value={l.id}>
              {l.titulo} ({l.disponible ? 'Disponible' : 'No disponible'})
            </option>
          ))}
        </select>
        {errores.libroId && <div className="text-danger small mt-1">{errores.libroId}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de préstamo</label>
        <input
          type="date"
          className="form-control"
          value={form.fechaPrestamo}
          onChange={(e) => setForm({ ...form, fechaPrestamo: e.target.value })}
        />
        {errores.fechaPrestamo && <div className="text-danger small mt-1">{errores.fechaPrestamo}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de devolución</label>
        <input
          type="date"
          className="form-control"
          value={form.fechaDevolucion}
          onChange={(e) => setForm({ ...form, fechaDevolucion: e.target.value })}
        />
        {errores.fechaDevolucion && <div className="text-danger small mt-1">{errores.fechaDevolucion}</div>}
      </div>

      <button type="submit" className="btn btn-primary">Confirmar préstamo</button>
    </form>
  );
}
