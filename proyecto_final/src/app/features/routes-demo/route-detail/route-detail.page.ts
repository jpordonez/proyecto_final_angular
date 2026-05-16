import { HttpErrorResponse } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskView } from '../../../models/task.model';
import { AcademicApiService } from '../../../services/academic-api.service';

@Component({
  selector: 'app-route-detail-page',
  imports: [RouterLink],
  templateUrl: './route-detail.page.html',
})
export class RouteDetailPage {
  /*
   * Objetivo del ejercicio:
   * Leer parametros de ruta.
   *
   * Que debe completar el estudiante:
   * Actividad 1:
   * - Convertir routeId a numero y validar que sea un entero positivo.
   *
   * Actividad 2:
   * - Crear en AcademicApiService un metodo getTaskById(id).
   *
   * Actividad 3:
   * - Usar ese metodo para consultar un detalle real al backend.
   *
   * Pista:
   * ActivatedRoute permite acceder a snapshot.paramMap o params como Observable.
   *
   * Criterio de aceptacion:
   * - Si id no es valido, la pantalla debe mostrar un mensaje.
   * - Si el backend responde 404, se debe mostrar "No encontrado".
   */
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(AcademicApiService);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly task = signal<TaskView | null>(null);

  readonly routeId = computed(() => {
    const rawId = this.route.snapshot.paramMap.get('id') ?? '';
    const parsedId = Number(rawId);
    return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
  });

  constructor() {
    this.loadTask();
  }

  private loadTask(): void {
    const id = this.routeId();
    if (!id) {
      this.errorMessage.set('El id de la ruta no es valido.');
      return;
    }

    this.loading.set(true);
    this.api.getTaskById(id).subscribe({
      next: (task) => {
        this.task.set(task);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.errorMessage.set('No encontrado.');
        } else {
          this.errorMessage.set('No se pudo cargar la tarea.');
        }
        this.loading.set(false);
      },
    });
  }
}
