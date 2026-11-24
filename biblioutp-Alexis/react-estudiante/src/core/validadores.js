export function esISBN(isbn) {
  return /^(978|979)\d{10}$/.test(String(isbn));
}

export function esCodigoAlumno(codigo) {
  return /^U\d{8}$/.test(String(codigo));
}

export function esCorreoUTP(correo) {
  return /^[a-z0-9._%+-]+@utp\.edu\.pe$/i.test(String(correo));
}

export function esFecha(fecha) {
  return /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(String(fecha));
}

export function validarPrestamo({ libroId, fechaPrestamo, fechaDevolucion }) {
  const errores = {};

  if (!libroId) {
    errores.libroId = `El campo libroId es obligatorio`;
  }

  if (!esFecha(fechaPrestamo)) {
    errores.fechaPrestamo = `La fecha de préstamo "${fechaPrestamo}" no tiene formato AAAA-MM-DD válido`;
  }

  if (!esFecha(fechaDevolucion)) {
    errores.fechaDevolucion = `La fecha de devolución "${fechaDevolucion}" no tiene formato AAAA-MM-DD válido`;
  }

  if (esFecha(fechaPrestamo) && esFecha(fechaDevolucion)) {
    const inicio = new Date(`${fechaPrestamo}T00:00:00`);
    const fin = new Date(`${fechaDevolucion}T00:00:00`);
    const dias = (fin - inicio) / (1000 * 60 * 60 * 24);

    if (dias <= 0) {
      errores.fechaDevolucion = `La devolución (${fechaDevolucion}) debe ser posterior al préstamo (${fechaPrestamo})`;
    } else if (dias > 15) {
      errores.fechaDevolucion = `El préstamo dura ${dias} días y el máximo permitido es 15 días`;
    }
  }

  return errores;
}
