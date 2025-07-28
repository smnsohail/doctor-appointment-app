import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  private currentUserSubject = new BehaviorSubject<any>(null);
  // Observable for current user
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  // Doctor Registration
  doctorRegister(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/doctor/register`, userData);
  }

  // Patient Registration
  patientRegister(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patient/register`, userData);
  }

  // Doctor Login
  doctorLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/doctor/login`, credentials);
  }

  // Patient Login
  patientLogin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patient/login`, credentials);
  }

  // Store token and user info
  setUserData(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Get current user
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
