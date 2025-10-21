import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  loginUser() {
    this.http.post('/api/login', { username: this.username, password: this.password }, { withCredentials: true }).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.loginMessage = response.message;
        // Redirect to home or dashboard
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.loginMessage = error.error.message || 'Login failed';
      }
    });
  }

  loginWithGoogle() {
    window.location.href = '/api/login/auth/google';
  }
}
