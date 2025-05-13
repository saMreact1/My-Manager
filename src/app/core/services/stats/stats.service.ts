import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:3000/tasks/tasks-stats'

  constructor(private http: HttpClient) { }

  getTaskStats(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }
}
