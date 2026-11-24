import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Prestamo } from '../core/modelos.js';
import { useTitulo } from '../hooks/useTitulo';

export default function MisPrestamos({ libros, prestamos }) {
  useTitulo('Mis Préstamos');
  const { usuario } = useAuth();
  const [ahora, setAhora] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hoyStr = ahora.toISOString().slice(0, 10);
  const misPrestamos = prestamos
    .filter((p) => p.usuarioId === usuario.id)
    .map((p) => new Prestamo(p));

  const vigentes = misPrestamos
    .filter((p) => p.activo && !p.estaVencido(hoyStr))
    .sort((a, b) => a.fechaDevolucion.localeCompare(b.fechaDevolucion));

  const proximo = vigentes;
  let contador = 'No tienes devoluciones próximas vigentes.';
  if (proximo) {
    const diff = Math.max(0, new Date(`${proximo.fechaDevolucion}T23:59:59`) - ahora);
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    contador = `${proximo.codigo}: ${d}d ${h}h ${m}m ${s}s restantes`;
  }

  return (
    <div>
      <h2>Mis Préstamos</h2>
      <div className="alert alert-info">Próxima devolución: <strong>{contador}</strong></div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr><th>Código</th><th>Libro</th><th>Préstamo</th><th>Devolución</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {misPrestamos.map((p) => {
            const vencido = p.estaVencido(hoyStr);
            const libro = libros.find((l) => l.id === p.libroId);
            return (
              <tr key={p.id} className={vencido ? 'table-danger text-danger fw-bold' : ''}>
                <td>{p.codigo}</td>
                <td>{libro ? libro.titulo : p.libroId}</td>
                <td>{p.fechaPrestamo}</td>
                <td>{p.fechaDevolucion}</td>
                <td>{vencido ? 'VENCIDO' : p.estado}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
