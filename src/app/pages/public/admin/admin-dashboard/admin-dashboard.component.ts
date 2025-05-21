import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task/task.service';
import { UserService } from '../../../../core/services/user/user.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(30px)'
        }),
        animate('500ms ease-out', style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeRoute', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class AdminDashboardComponent implements OnInit {

  users: any[] = [];
  tasks: any[] = [];
  isCollapsed: boolean = true;
  isSmallScreen: boolean = false;
  isDarkMode: boolean = false;
  userName: string;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private auth: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSmallScreen = result.matches;
      this.isCollapsed = !this.isSmallScreen;
    })
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
    this.loadUserInfo();
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  logout() {
    this.auth.logout()
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  loadUserInfo() {
    const user = this.userService.getUser();
    this.userName = user?.name || 'User';
  }
}
