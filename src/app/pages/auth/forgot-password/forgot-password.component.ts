import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar
  ) {}

  onSubmit() {
    if(this.form.invalid) return;
    
    this.auth.forgotPassword(this.form.value.email).subscribe({
      next: () => this.snack.open('Password reset link has been sent to your email', 'Close', { duration: 3000 }),
      error: () => this.snack.open('Failed to send password reset link', 'Close', { duration: 3000 })
    });
  }
}
