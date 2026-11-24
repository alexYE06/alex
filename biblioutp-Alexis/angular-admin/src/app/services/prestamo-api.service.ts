import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestamo } from '../models/biblioteca.model';

@Injectable({ providedIn: 'root' })
export class PrestamoApi {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/prestamos';

  listar(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }
}
