import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  userType = 'patient';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.snackBar.open('Please fill all fields', 'Close', { duration: 3000 });
      return;
    }

    this.loading = true;
    const credentials = { email: this.email, password: this.password };

    const loginObservable = this.userType === 'doctor' 
      ? this.authService.doctorLogin(credentials)
      : this.authService.patientLogin(credentials);

    loginObservable.subscribe({
      next: (response) => {
        this.authService.setUserData(response.token, response.user);
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open(error.error.message || 'Login failed', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
