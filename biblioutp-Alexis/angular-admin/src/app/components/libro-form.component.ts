import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LibroApi } from '../services/libro-api.service';

function validadorISBN(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value || '');
  if (!valor) return null;
  return /^(978|979)\d{10}$/.test(valor) ? null : { isbnInvalido: true };
}

@Component({
  selector: 'app-libro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <h2>{{ editandoId ? 'Editar Libro' : 'Nuevo Libro' }}</h2>

    <form [formGroup]="form" (ngSubmit)="guardar()" class="mt-3" style="max-width: 500px;">
      <div class="mb-3">
        <label class="form-label">Título</label>
        <input type="text" class="form-control" formControlName="titulo" />
        @if (form.get('titulo')?.touched && form.get('titulo')?.invalid) {
          <div class="text-danger small mt-1">
            @if (form.get('titulo')?.errors?.['required']) { El título es obligatorio. }
            @if (form.get('titulo')?.errors?.['minlength']) { Debe tener al menos 3 caracteres. }
          </div>
        }
      </div>

      <div class="mb-3">
        <label class="form-label">ISBN</label>
        <input type="text" class="form-control" formControlName="isbn" />
        @if (form.get('isbn')?.touched && form.get('isbn')?.invalid) {
          <div class="text-danger small mt-1">
            @if (form.get('isbn')?.errors?.['required']) { El ISBN es obligatorio. }
            @if (form.get('isbn')?.errors?.['isbnInvalido']) { Debe tener 13 dígitos y empezar con 978 o 979. }
          </div>
        }
      </div>

      <div class="mb-3">
        <label class="form-label">Autor</label>
        <input type="text" class="form-control" formControlName="autor" />
      </div>

      <div class="mb-3">
        <label class="form-label">Año</label>
        <input type="number" class="form-control" formControlName="anio" />
        @if (form.get('anio')?.touched && form.get('anio')?.invalid) {
          <div class="text-danger small mt-1">El año debe estar entre 1500 y 2026.</div>
        }
      </div>

      <div class="mb-3">
        <label class="form-label">Categoría</label>
        <select class="form-select" formControlName="categoria">
          <option value="">Seleccione...</option>
          <option value="Literatura">Literatura</option>
          <option value="Programación">Programación</option>
          <option value="Ciencia">Ciencia</option>
        </select>
        @if (form.get('categoria')?.touched && form.get('categoria')?.invalid) {
          <div class="text-danger small mt-1">La categoría es obligatoria.</div>
        }
      </div>

      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="disp" formControlName="disponible" />
        <label class="form-check-label" for="disp">Disponible</label>
      </div>

      <button type="submit" class="btn btn-success me-2" [disabled]="form.invalid">Guardar</button>
      <a routerLink="/libros" class="btn btn-secondary">Cancelar</a>
    </form>
  `
})
export class LibroFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private libroApi = inject(LibroApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editandoId: number | null = null;

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    isbn: ['', [Validators.required, validadorISBN]],
    autor: [''],
    anio: [2024, [Validators.required, Validators.min(1500), Validators.max(2026)]],
    categoria: ['', [Validators.required]],
    disponible: [true]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editandoId = Number(idParam);
      this.libroApi.obtener(this.editandoId).subscribe((libro) => {
        this.form.patchValue(libro);
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;
    const datos = this.form.getRawValue();

    if (this.editandoId) {
      this.libroApi.actualizar({ id: this.editandoId, ...datos }).subscribe(() => {
        this.router.navigate(['/libros']);
      });
    } else {
      this.libroApi.crear(datos).subscribe(() => {
        this.router.navigate(['/libros']);
      });
    }
  }
}
