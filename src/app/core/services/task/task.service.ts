import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../../model/task.model';
import { isPlatformBrowser } from '@angular/common';
import { WebService } from '../web-request/web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private webService: WebService
  ) {}

  getTasks(): Observable<any> {
    return this.webService.get('tasks');
  }

  createTask(task: Task): Observable<any> {
    return this.webService.post('tasks', task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.webService.delete(`tasks/${taskId}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.webService.put(`tasks/${task._id}`, task);
  }



  // setTask(task: Task) {
  //   this.taskSource.next(task);
  // }

  // addTask(task: Task) {
  //   const currentTasks = this.tasksSubject.getValue()
  //   const updatedTasks = [...currentTasks, task]
  //   this.tasksSubject.next(updatedTasks)
  //   this.saveTasks(updatedTasks)
  // }

  // deleteTask(id: number) {
  //   const updatedTasks = this.tasksSubject.getValue().filter(task => task.id !== id)
  //   this.tasksSubject.next(updatedTasks)
  //   this.saveTasks(updatedTasks)
  // }

  // private loadTasks(): Task[] {
  //   if(isPlatformBrowser(this.platformId)) {
  //     const storedTasks = localStorage.getItem(this.storageKey)
  //     return storedTasks ? JSON.parse(storedTasks) : []
  //   }
  //   return []
  // }

  // private saveTasks(tasks: Task[]) {
  //   if(isPlatformBrowser(this.platformId)) {
  //     localStorage.setItem(this.storageKey, JSON.stringify(tasks))
  //   }
  // }

  // updateTask(updatedTask: Task) {
  //   const currentTasks = this.tasksSubject.getValue();
  //   const updatedTasks = currentTasks.map(task =>
  //     task.id === updatedTask.id ? updatedTask : task
  //   );
  //   this.tasksSubject.next(updatedTasks);
  //   localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // optional if you’re using localStorage
  // }
  

}
