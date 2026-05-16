import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateTaskPayload, TaskView } from '../../models/task.model';
import { AcademicApiService } from '../../services/academic-api.service';
import { TaskDraftStorageService } from '../../services/task-draft-storage.service';

interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<'low' | 'medium' | 'high'>;
  subtasks: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-forms-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './forms.page.html',
})
export class FormsPage {
  /*
   * Objetivo del ejercicio:
   * Practicar formularios reactivos con FormGroup, FormControl y FormArray.
   *
   * Que debe completar el estudiante:
   * Actividad 1, nivel basico:
   * - Agregar Validators.minLength(3) al titulo.
   *
   * Actividad 2, nivel intermedio:
   * - Construir un CreateTaskPayload usando los valores del formulario.
   *
   * Actividad 3, nivel intermedio:
   * - Enviar el formulario al backend usando AcademicApiService.createTask().
   *
   * Actividad 4, nivel reto:
   * - Guardar mas campos como borrador en localStorage y restaurarlos al recargar.
   *
   * Criterio de aceptacion:
   * - Si el formulario es invalido, no debe hacer POST.
   * - Si el POST funciona, debe limpiar el formulario o mostrar la tarea creada.
   * - El payload debe respetar los nombres del backend: student_id y due_date.
   */
  private readonly api = inject(AcademicApiService);
  private readonly draftStorage = inject(TaskDraftStorageService);
  private readonly draft = this.draftStorage.loadDraft();

  submitError = '';
  createdTask: TaskView | null = null;

  readonly taskForm = new FormGroup<TaskForm>({
    title: new FormControl(this.draft.title, {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl(this.draft.description, {
      nonNullable: true,
    }),
    priority: new FormControl(this.draft.priority, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    subtasks: new FormArray<FormControl<string>>([
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ]),
  });

  get subtasks(): FormArray<FormControl<string>> {
    return this.taskForm.controls.subtasks;
  }

  addSubtask(): void {
    this.subtasks.push(
      new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    );
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  saveDraft(): void {
    this.draftStorage.saveDraft({
      title: this.taskForm.controls.title.value,
      description: this.taskForm.controls.description.value,
      priority: this.taskForm.controls.priority.value,
    });
  }

  submit(): void {
    this.taskForm.markAllAsTouched();
    this.submitError = '';
    this.createdTask = null;

    if (this.taskForm.invalid) {
      return;
    }

    const value = this.taskForm.getRawValue();
    const payload: CreateTaskPayload = {
      title: value.title.trim(),
      description: value.description.trim() ? value.description.trim() : null,
      status: 'pending',
      priority: value.priority,
      student_id: null,
      due_date: null,
    };

    this.api.createTask(payload).subscribe({
      next: (task) => {
        this.createdTask = task;
        this.taskForm.reset({
          title: '',
          description: '',
          priority: 'medium',
        });
        this.taskForm.setControl(
          'subtasks',
          new FormArray<FormControl<string>>([
            new FormControl('', { nonNullable: true, validators: [Validators.required] }),
          ]),
        );
        this.draftStorage.clearDraft();
      },
      error: (error: unknown) => {
        this.submitError =
          error instanceof Error ? error.message : 'No se pudo crear la tarea.';
      },
    });
  }
}
