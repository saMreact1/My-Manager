import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(7)]],
  })

  token: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    if(this.form.invalid) return;

    this.auth.resetPassword(this.token, this.form.value.password).subscribe({
      next: () => {
        this.snack.open('Password has been reset successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Failed to reset password', 'Close', { duration: 3000 });
      }
    })
  }
}
