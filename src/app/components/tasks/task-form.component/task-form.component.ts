import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/tasks/task.service';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  standalone: true,
})
export class TaskFormComponent {
  private taskService = inject(TaskService);

  add(input: HTMLInputElement) {
    const value = input.value.trim();

    if (value.length > 0) {
      this.taskService.addTask(value);
      input.value = '';
      input.focus();
    }
  }
}
