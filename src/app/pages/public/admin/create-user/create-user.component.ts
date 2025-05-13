import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  createUserForm: FormGroup;
  roles = ['admin', 'user']; // Available roles
  message: string = '';
  error: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.createUserForm.controls;
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      const headers = { 'Content-Type': 'application/json' };

      this.http.post('http://localhost:3000/admin/users', this.createUserForm.value, {headers})
        .subscribe(response => {
          console.log('User Created:', response);
          this.router.navigate(['/admin/users']);  // Redirect to user list
        });
    }
    // if(this.createUserForm.valid) return;

    // this.userService.createUser(this.createUserForm.value).subscribe({
    //   next: (res) => {
    //     console.log('Create response:', res);
    //     this.auth.saveToken(res.token);
    //     this.router.navigate(['.admin/users'])
    //   }, error: (err) => {
    //     this.error = err.error?.message;
    //     console.log(err);
    //   }
    // })
  }
}
