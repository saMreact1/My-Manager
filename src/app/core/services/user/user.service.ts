import { Injectable } from '@angular/core';
import { WebService } from '../web-request/web.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'http://localhost:3000/admin/users';

  constructor(
    private web: WebService,
    private http: HttpClient
  ) { }

  createUser(userData: any) {
    const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage

    if(token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post(`${environment.apiUrl}admin/users`, userData, {headers});
    } else {
      console.log('No token available');
      return (null);
    }
  }

  getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  getAllUsers() {
    return this.web.get('admin/users')
  }
}
