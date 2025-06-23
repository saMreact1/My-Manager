import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';

// Components
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RegisterComponent } from './pages/auth/register/register.component';
import { HomeComponent } from './pages/public/home/home.component';
import { DashboardComponent } from './pages/public/dashboard/dashboard.component';
import { TaskListComponent } from './pages/public/tasks/task-list/task-list.component';
import { TaskFormComponent } from './pages/public/tasks/task-form/task-form.component';
import { TaskDetailComponent } from './pages/public/tasks/task-detail/task-detail.component';
import { NavbarComponent } from './shared/navbar/navbar.component'
import { LoginComponent } from './pages/auth/login/login.component';
import { ChartsComponent } from './pages/public/admin/charts/charts.component';
import { CreateUserComponent } from './pages/public/admin/create-user/create-user.component';
import { AdminDashboardComponent } from './pages/public/admin/admin-dashboard/admin-dashboard.component';
import { DeleteConfirmationComponent } from './pages/public/tasks/delete-confirmation/delete-confirmation.component';
import { SidebarComponent } from './pages/public/admin/sidebar/sidebar.component';
import { UserListComponent } from './pages/public/admin/user-list/user-list.component';
import { StatsCardsComponent } from './pages/public/admin/stats-cards/stats-cards.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ComingSoonComponent } from './pages/public/coming-soon/coming-soon.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipListbox } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    NavbarComponent,
    LoginComponent,
    DeleteConfirmationComponent,
    CreateUserComponent,
    AdminDashboardComponent,
    SidebarComponent,
    UserListComponent,
    StatsCardsComponent,
    ChartsComponent,
    LoaderComponent,
    ComingSoonComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipListbox,
    MatTooltipModule,
    // ChartsComponent
  ],
  providers: [
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
