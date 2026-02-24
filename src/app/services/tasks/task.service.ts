import { computed, Injectable, signal } from '@angular/core';
import { Task } from '../../models/task.model';

/** 
 * Decorador que indica que esta clase
 * es un servicio y que solo se creará una
 * única instancia global
 */
@Injectable({
  providedIn: 'root',
})

export class TaskService {

  /**
   * Creamos un signal de array de Task
   */
  private tasksSignal = signal<Task[]>([]);

  /**
   * Lo definimos como solo lectura para que
   * sea inmutable
   */
  tasks = this.tasksSignal.asReadonly();

  /**
   * Mediante computed, obtenemos cuantas task
   * hay en el array de signal task
   */
  total = computed(() => this.tasksSignal().length);

  /**
   * Utilizando el método filter, contamos cuantas
   * task hay completadas en el array de signal
   * task
   */
  completed = computed(() => this.tasksSignal().filter(t => t.completed).length);

  /**
   * Al iniciar el servicio se ejecuta el constructor
   * que se trae las task que hayan en el local storage
   * y las parsea en formato json
   */
  constructor(){
    const saved = localStorage.getItem('tasks');
    if(saved){
      this.tasksSignal.set(JSON.parse(saved));
    }
  }

  /**
   * Pasando el parametro title a la función de añadir
   * creamos una nueva tarea y actualizamos el estado
   * global mediante la signal de task y guardamos
   * los cambios en local storage
   * @param title 
   */
  addTask(title: string){
    const newTask: Task = { id: crypto.randomUUID(), title, completed: false};
    this.tasksSignal.update(t => [...t, newTask]);
    this.save();
  }

  /**
   * Mediante el ID filtramos con map en el array de
   * task, y actualizamos el valor de la task, una vez
   * actualizado, guardamos en localStorage
   * @param id 
   */
  toggleTask(id: string){
    this.tasksSignal.update(t => t.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    this.save();
  }

  private save(){
    localStorage.setItem('tasks', JSON.stringify(this.tasksSignal()));
  }
}
