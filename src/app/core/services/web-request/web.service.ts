import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000';
  }

  get(url: string, options = {}): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${url}`, options);
  }

  post(url: string, body: Object) {
    return this.http.post(`${this.ROOT_URL}/${url}`, body);
  }

  delete(url: string) {
    return this.http.delete(`${this.ROOT_URL}/${url}`);
  }

  put(url: string, body: Object) {
    return this.http.put(`${this.ROOT_URL}/${url}`, body);
  }
}
