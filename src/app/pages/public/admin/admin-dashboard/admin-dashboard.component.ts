import { Component } from '@angular/core';
import { TaskService } from '../../../../core/services/task/task.service';
import { UserService } from '../../../../core/services/user/user.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

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
export class AdminDashboardComponent {

  users: any[] = [];
  tasks: any[] = [];
  isCollapsed: boolean = true;
  isDarkMode: boolean = false;

  // userCount = 120;
  // taskCount = 350;
  // pendingTasks = 90;
  // completedTasks = 260;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks)
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
}
