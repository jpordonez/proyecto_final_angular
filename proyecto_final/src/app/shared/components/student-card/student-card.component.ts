import { Component, input, output } from '@angular/core';
import { StudentView } from '../../../models/student.model';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
})
export class StudentCardComponent {
  /*
   * Objetivo del componente:
   * Practicar comunicacion padre -> hijo con input() y hijo -> padre con output().
   *
   * Criterio de aceptacion:
   * - El output debe emitir StudentView.
   * - El componente hijo no debe conocer ni modificar el array del padre.
   */
  readonly student = input.required<StudentView>();
  readonly selected = output<StudentView>();
  readonly removeRequested = output<StudentView>();

  selectStudent(): void {
    this.selected.emit(this.student());
  }

  requestRemove(): void {
    this.removeRequested.emit(this.student());
  }
}
