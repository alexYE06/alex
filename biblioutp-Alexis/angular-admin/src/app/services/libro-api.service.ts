import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro, NuevoLibro } from '../models/biblioteca.model';

@Injectable({ providedIn: 'root' })
export class LibroApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/libros';

  listar(categoria?: string, texto?: string): Observable<Libro[]> {
    let params = new HttpParams();
    if (categoria) params = params.set('categoria', categoria);
    if (texto) params = params.set('q', texto);
    return this.http.get<Libro[]>(this.apiUrl, { params });
  }

  obtener(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.apiUrl}/${id}`);
  }

  crear(libro: NuevoLibro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }

  actualizar(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}/${libro.id}`, libro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
