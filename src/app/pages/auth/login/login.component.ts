import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  onSubmit() {
    const { email = '', password = '' } = this.form.value;

    if (!email.trim() || !password.trim()) {
      console.error('Please fill in both email and password!');
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        console.log('Login Response:', res);
        this.authService.saveToken(res.token);
        const role = this.authService.getRole(res.token);

        // Role-based redirection
        if(role === 'admin') {
          this.router.navigate(['/admin'])
        } else {
          this.router.navigate(['/tasks']);
        }
      },
      error: (err) => {
        this.loginError = err.error?.message
        console.error(err);
      }
    });
  }
}
