import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { esISBN, esCodigoAlumno, esFecha, validarPrestamo } from './validadores.js';
import { Libro, Prestamo } from './modelos.js';
import {
  prestamosPorEstado,
  librosMasPrestados,
  autoresUnicos,
  puedePrestar,
  crearGeneradorCodigos
} from './estadisticas.js';

const libros = [
  { id: 1, isbn: '9786124567890', titulo: 'La ciudad y los perros', autor: 'Mario Vargas Llosa', categoria: 'Literatura', anio: 1963, disponible: false },
  { id: 2, isbn: '9786124567891', titulo: 'Los ríos profundos', autor: 'José María Arguedas', categoria: 'Literatura', anio: 1958, disponible: false },
  { id: 3, isbn: '9781593279509', titulo: 'Eloquent JavaScript', autor: 'Marijn Haverbeke', categoria: 'Programación', anio: 2018, disponible: false },
  { id: 4, isbn: '9781491904244', titulo: "You Don't Know JS Yet", autor: 'Kyle Simpson', categoria: 'Programación', anio: 2020, disponible: true },
  { id: 5, isbn: '9786124567892', titulo: 'Conversación en La Catedral', autor: 'Mario Vargas Llosa', categoria: 'Literatura', anio: 1969, disponible: false },
  { id: 6, isbn: '9798602477429', titulo: 'Introducción a la IA', autor: 'Ana Torres', categoria: 'Ciencia', anio: 2024, disponible: true }
];

const prestamos = [
  { id: 1, codigo: 'PRE-0001', libroId: 1, usuarioId: 2, fechaPrestamo: '2026-11-16', fechaDevolucion: '2026-11-30', estado: 'activo' },
  { id: 2, codigo: 'PRE-0002', libroId: 3, usuarioId: 2, fechaPrestamo: '2026-11-18', fechaDevolucion: '2026-12-02', estado: 'activo' },
  { id: 3, codigo: 'PRE-0003', libroId: 5, usuarioId: 2, fechaPrestamo: '2026-11-05', fechaDevolucion: '2026-11-16', estado: 'activo' },
  { id: 4, codigo: 'PRE-0004', libroId: 2, usuarioId: 3, fechaPrestamo: '2026-11-17', fechaDevolucion: '2026-11-27', estado: 'activo' },
  { id: 5, codigo: 'PRE-0005', libroId: 4, usuarioId: 3, fechaPrestamo: '2026-10-20', fechaDevolucion: '2026-11-03', estado: 'devuelto' },
  { id: 6, codigo: 'PRE-0006', libroId: 6, usuarioId: 2, fechaPrestamo: '2026-10-01', fechaDevolucion: '2026-10-10', estado: 'devuelto' },
  { id: 7, codigo: 'PRE-0007', libroId: 1, usuarioId: 4, fechaPrestamo: '2026-09-10', fechaDevolucion: '2026-09-24', estado: 'devuelto' }
];

// Salida en consola de las 5 funciones de estadísticas
console.log('1. Préstamos por estado:', prestamosPorEstado(prestamos));
console.log('2. Libros más prestados:', librosMasPrestados(libros, prestamos));
console.log('3. Autores únicos:', autoresUnicos(libros));
console.log('4. Puede prestar usuario 2:', puedePrestar(2, prestamos));
const gen = crearGeneradorCodigos('PRE', 8);
console.log('5. Generador de códigos:', gen(), gen());

describe('Pruebas de núcleo BiblioUTP', () => {
  it('1. Rechaza un ISBN inválido', () => {
    assert.equal(esISBN('1234567890123'), false);
    assert.equal(esISBN('978123'), false);
    assert.equal(esISBN('9786124567890'), true);
  });

  it('2. Valida código de alumno y formato de fecha', () => {
    assert.equal(esCodigoAlumno('U20231234'), true);
    assert.equal(esCodigoAlumno('u20231234'), false);
    assert.equal(esFecha('2026-11-30'), true);
    assert.equal(esFecha('2026-13-40'), false);
  });

  it('3. Rechaza un préstamo de 20 días', () => {
    const errores = validarPrestamo({
      libroId: 4,
      fechaPrestamo: '2026-11-01',
      fechaDevolucion: '2026-11-21'
    });
    assert.ok(errores.fechaDevolucion);
  });

  it('4. Verifica estaVencido del préstamo PRE-0003 con hoy = 2026-11-18', () => {
    const p3 = new Prestamo(prestamos[2]);
    assert.equal(p3.estaVencido('2026-11-18'), true);
    assert.equal(p3.diasPrestamo(), 11);
  });

  it('5. Verifica puedePrestar(2, prestamos) === false', () => {
    assert.equal(puedePrestar(2, prestamos), false);
  });

  it('6. Verifica puedePrestar(4, prestamos) === true y etiqueta de Libro', () => {
    assert.equal(puedePrestar(4, prestamos), true);
    const libro = new Libro(libros[0]);
    assert.equal(libro.etiqueta, 'La ciudad y los perros (1963)');
  });
});
