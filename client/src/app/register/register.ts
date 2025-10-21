import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username: string = '';
  password: string = '';
  email: string = '';
  name: string = '';
  registerMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
    this.http.post('/api/register', { username: this.username, password: this.password, email: this.email, name: this.name }, { withCredentials: true }).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.registerMessage = response.message;
        // Redirect to login after successful registration
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.registerMessage = error.error.message || 'Registration failed';
      }
    });
  }
}
