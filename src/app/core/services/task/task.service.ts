import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../../model/task.model';
import { isPlatformBrowser } from '@angular/common';
import { WebService } from '../web-request/web.service';
import  { HttpHeaders } from '@angular/common/http';
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

  getUserTasks(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.webService.get('tasks/user', { headers }); // ✅ pass headers here
  }
}
