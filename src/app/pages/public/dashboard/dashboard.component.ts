import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TaskService } from '../../../core/services/task/task.service';
import { UserService } from '../../../core/services/user/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
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
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  userName: string;
  isCollapsed: boolean = true;
  isSmallScreen: boolean = false;

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
    this.loadUserInfo();
    this.loadUserTasks();
  }

  get sidenavMode() {
    return this.isSmallScreen ? 'over' : 'side';
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  loadUserInfo() {
    const user = this.userService.getUser();
    this.userName = user?.name || 'User';
  }

  loadUserTasks() {
    this.taskService.getUserTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => console.error('❌ Error loading tasks:', err)
    });
  }

  countTasksByStatus(status: string): number {
    return this.tasks.filter(t => t.status === status).length;
  }

  logout() {
    this.auth.logout();
  }
}
