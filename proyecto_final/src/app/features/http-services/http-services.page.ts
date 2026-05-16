import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AcademicApiService } from '../../services/academic-api.service';
import { CategoryView } from '../../models/category.model';
import { ProductView } from '../../models/product.model';
import { TaskView } from '../../models/task.model';

@Component({
  selector: 'app-http-services-page',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './http-services.page.html',
})
export class HttpServicesPage {
  /*
   * Objetivo del ejercicio:
   * Consumir el backend real con HttpClient y Observables.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Identificar que variables terminan con $ porque son Observables.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar manejo visual de error con catchError.
   *
   * Actividad 3, nivel intermedio:
   * - Completar los mappers para que no se muestren textos "TODO".
   *
   * Actividad 4, nivel reto:
   * - Crear un boton que haga POST de una tarea.
   *
   * Criterio de aceptacion:
   * - No suscribirse manualmente si async pipe es suficiente.
   * - Usar subscribe solo para acciones imperativas como POST.
   * - Mostrar al usuario si el backend no esta disponible.
   */
  private readonly academicApi = inject(AcademicApiService);

  readonly categories$: Observable<CategoryView[]>;
  readonly products$: Observable<ProductView[]>;
  readonly tasks$: Observable<TaskView[]>;
  readonly categoriesError = signal('');
  readonly productsError = signal('');
  readonly tasksError = signal('');
  readonly createError = signal('');
  readonly createdTask = signal<TaskView | null>(null);

  readonly exampleJson = {
    endpoint: '/api/tasks',
    method: 'GET',
    topic: 'json',
  };

  constructor() {
    this.categories$ = this.academicApi.getCategories().pipe(
      catchError((error: unknown) => {
        this.categoriesError.set(
          error instanceof Error ? error.message : 'No se pudieron cargar las categorias.',
        );
        return of([]);
      }),
    );

    this.products$ = this.academicApi.getProducts().pipe(
      catchError((error: unknown) => {
        this.productsError.set(
          error instanceof Error ? error.message : 'No se pudieron cargar los productos.',
        );
        return of([]);
      }),
    );

    this.tasks$ = this.academicApi.getTasks().pipe(
      catchError((error: unknown) => {
        this.tasksError.set(
          error instanceof Error ? error.message : 'No se pudieron cargar las tareas.',
        );
        return of([]);
      }),
    );
  }

  createDemoTask(): void {
    this.createError.set('');
    this.createdTask.set(null);

    this.academicApi
      .createTask({
        title: `Tarea demo ${new Date().toLocaleTimeString()}`,
        description: 'Creada desde la pantalla de servicios HTTP.',
        status: 'pending',
        priority: 'medium',
        student_id: null,
        due_date: null,
      })
      .subscribe({
        next: (task) => this.createdTask.set(task),
        error: (error: unknown) => {
          this.createError.set(
            error instanceof Error ? error.message : 'No se pudo crear la tarea.',
          );
        },
      });
  }
}
