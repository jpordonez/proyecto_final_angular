import { Component, computed, inject, signal } from '@angular/core';
import { LocalStorageService } from '../../core/storage/local-storage.service';
import { TaskStatus, TaskView } from '../../models/task.model';

type DemoState = 'loading' | 'empty' | 'error' | 'ready' | 'filtered';

const TASK_FILTER_KEY = 'academic-task-filter';

@Component({
  selector: 'app-control-flow-page',
  templateUrl: './control-flow.page.html',
})
export class ControlFlowPage {
  /*
   * Objetivo del ejercicio:
   * Practicar @if y @for sin usar *ngIf ni *ngFor.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Cambiar el estado desde botones.
   *
   * Actividad 2, nivel intermedio:
   * - Agregar una signal para filtrar tareas por estado.
   *
   * Actividad 3, nivel reto:
   * - Mostrar un mensaje diferente cuando el filtro no tiene resultados.
   *
   * Criterio de aceptacion:
   * - Usar @if y @for, no *ngIf ni *ngFor.
   * - Usar track task.id.
   * - No mutar directamente el array de tasks.
   *
   * Pista:
   * En modo zoneless, signal ayuda a actualizar la vista de forma explicita.
   */
  private readonly storage = inject(LocalStorageService);
  private readonly initialFilter = this.storage.getItem<{ status: TaskStatus } | null>(
    TASK_FILTER_KEY,
    null,
  );

  readonly state = signal<DemoState>('ready');
  readonly selectedStatus = signal<TaskStatus | 'all'>(this.initialFilter?.status ?? 'all');

  readonly tasks = signal<TaskView[]>([
    {
      id: 1,
      title: 'Configurar proyecto Angular',
      summary: 'Crear rutas principales.',
      status: 'done',
      statusLabel: 'Terminada',
      priorityLabel: 'Alta',
      studentLabel: 'Ana Mora',
      dueDateLabel: '02/05/2026',
    },
    {
      id: 2,
      title: 'Crear formulario reactivo',
      summary: 'Practicar FormGroup y FormArray.',
      status: 'pending',
      statusLabel: 'Pendiente',
      priorityLabel: 'Media',
      studentLabel: 'Sin estudiante asignado',
      dueDateLabel: 'Sin fecha',
    },
  ]);

  readonly filteredTasks = computed(() => {
    const status = this.selectedStatus();
    if (status === 'all') {
      return this.tasks();
    }
    return this.tasks().filter((task) => task.status === status);
  });

  setState(state: DemoState): void {
    this.state.set(state);
  }

  setFilter(status: TaskStatus | 'all'): void {
    this.selectedStatus.set(status);
    this.state.set(status === 'all' ? 'ready' : 'filtered');
  }
}
