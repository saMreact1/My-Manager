import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000/tasks/stats'

  constructor(private http: HttpClient) { }

  getDashboardStats() {
  return this.http.get<{
    totalTasks: number;
    pending: number;
    inProgress: number;
    done: number;
    users: number;
  }>(this.apiUrl);
}

  // getTaskStats(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl)
  // }

  // getUserStats() {
  //   return this.http.get<{ totalUsers: number }>('/users/stats');
  // }
}
