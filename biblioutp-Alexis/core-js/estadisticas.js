export function prestamosPorEstado(prestamos) {
  return prestamos.reduce(
    (acc, p) => {
      if (p.estado === 'activo') acc.activo += 1;
      if (p.estado === 'devuelto') acc.devuelto += 1;
      return acc;
    },
    { activo: 0, devuelto: 0 }
  );
}

export function librosMasPrestados(libros, prestamos) {
  const conteo = new Map();
  for (const p of prestamos) {
    conteo.set(p.libroId, (conteo.get(p.libroId) || 0) + 1);
  }

  const ranking = libros.map((libro) => ({
    ...libro,
    totalPrestamos: conteo.get(libro.id) || 0
  }));

  return [...ranking].sort((a, b) => b.totalPrestamos - a.totalPrestamos);
}

export function autoresUnicos(libros) {
  return [...new Set(libros.map((l) => l.autor))];
}

export function puedePrestar(usuarioId, prestamos) {
  const activos = prestamos.filter(
    (p) => p.usuarioId === Number(usuarioId) && p.estado === 'activo'
  ).length;
  return activos < 3;
}

export function crearGeneradorCodigos(prefijo = 'PRE', inicio = 8) {
  let actual = inicio;
  return () => {
    const codigo = `${prefijo}-${String(actual).padStart(4, '0')}`;
    actual += 1;
    return codigo;
  };
}
