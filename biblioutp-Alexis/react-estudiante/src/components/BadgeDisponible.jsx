export default function BadgeDisponible({ disponible }) {
  return (
    <span className={`badge ${disponible ? 'bg-success' : 'bg-secondary'}`}>
      {disponible ? 'Disponible' : 'Prestado'}
    </span>
  );
}
