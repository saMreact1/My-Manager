import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { ComingSoonComponent } from './pages/public/coming-soon/coming-soon.component';
import { DashboardComponent } from './pages/public/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { TaskListComponent } from './pages/public/tasks/task-list/task-list.component';
import { authGuard } from './pages/auth/authguard/auth.guard';
import { AdminDashboardComponent } from './pages/public/admin/admin-dashboard/admin-dashboard.component';
import { roleGuard } from './pages/auth/authguard/role.guard';
import { CreateUserComponent } from './pages/public/admin/create-user/create-user.component';
import { UserListComponent } from './pages/public/admin/user-list/user-list.component';
import { StatsCardsComponent } from './pages/public/admin/stats-cards/stats-cards.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      {path: 'statistics', component: StatsCardsComponent},
      {path: 'users', component: UserListComponent},
      {path: 'tasks', component: TaskListComponent},
      {path: 'create-user', component: CreateUserComponent, canActivate: [authGuard]},
      {path: '', redirectTo: 'statistics', pathMatch: 'full'}
    ]
    // canActivate: [roleGuard]
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'tasks', component: TaskListComponent },
      { path: 'coming-soon', component: ComingSoonComponent },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
