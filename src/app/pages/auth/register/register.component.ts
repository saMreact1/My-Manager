import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      role: ['user', [Validators.required]]
    });
  }

  onSubmit() {
    const { name, email, password } = this.form.value;

    if (!name.trim() || !email.trim() || !password.trim()) {
      // Handle empty fields error
      console.error('Please fill all the fields properly!');
      return;
    }

    if(this.form.invalid) return;

    this.auth.register(this.form.value).subscribe({
      next: (res) => {
        console.log('Register Response:', res);
        this.auth.saveToken(res.token);
        this.router.navigate(['/tasks'])

        // if(role === 'admin') {
        //   this.router.navigate(['/admin-dashboard']);
        // } else {
        //   this.router.navigate(['/tasks'])
        // }
      },
      error: (err) => {
        this.error = err.error?.message
        console.error(err)
      }
    });
  }
}
