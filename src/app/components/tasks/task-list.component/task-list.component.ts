import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/tasks/task.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone: true,
})
export class TaskListComponent {
  public taskService = inject(TaskService);
}
