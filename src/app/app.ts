import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/tasks/task-list.component/task-list.component';
import { TaskFormComponent } from "./components/tasks/task-form.component/task-form.component";
import { TaskService } from './services/tasks/task.service';

@Component({
  selector: 'app-root',
  imports: [TaskListComponent, TaskFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('angular-basics-2');
  public taskService = inject(TaskService);
}
