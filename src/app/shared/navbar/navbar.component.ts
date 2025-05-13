import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMobile: boolean = false;
  sidenavOpen: boolean = false;
  isAuthenticated: boolean = false;
  userRole: string | null = null
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userRole = user?.role || null;
    });
  }

  logout() {
    this.auth.logout()
  }

  toggleSidenav() {

  }

  toggleTheme() {

  }
}
