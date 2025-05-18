import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/environment';


export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  // iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{token: string}>(`${environment.apiUrl}auth/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        } else {
          console.error('No token received in response');
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  register(data: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<{token: string}>(`${environment.apiUrl}auth/register`, data).pipe(
      tap((res: any) => {
        console.log('🌐 Response from backend:', res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        } else {
          console.error('No token received in response');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(token: string): string | null {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return decoded.role || null;
    } catch(err) {
      console.error('Error decoding token:', err);
      return null
    }
  }

  getCurrentUserRole(): string | null {
    const token = this.getToken();
    return token ? this.getRole(token) : null;
  }

  getTenantId(): string | null {
    const token = localStorage.getItem('token');
    if(!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.tenantId;
  }
}
