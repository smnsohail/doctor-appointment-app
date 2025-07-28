import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  userType = 'patient';
  specialization = '';
  qualifications = '';
  clinicName = '';
  address = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register() {
    if (!this.name || !this.email || !this.password) {
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.loading = true;
    const userData: any = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    if (this.userType === 'doctor') {
      userData.specialization = this.specialization;
      userData.qualifications = this.qualifications;
      userData.clinicName = this.clinicName;
      userData.address = this.address;
    }

    const registerObservable =
      this.userType === 'doctor'
        ? this.authService.doctorRegister(userData)
        : this.authService.patientRegister(userData);

    registerObservable.subscribe({
      next: (response) => {
        this.snackBar.open('Registration successful! Please login.', 'Close', {
          duration: 3000,
        });
        this.goToLogin();
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open(
          error.error.message || 'Registration failed',
          'Close',
          { duration: 3000 }
        );
        this.loading = false;
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
