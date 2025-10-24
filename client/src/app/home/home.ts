import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) {}

  searchProduct() {
    const searchBar = document.getElementById('searchBar') as HTMLInputElement;
    const query = searchBar.value.trim();
    if (query) {
      this.router.navigate(['/products'], { queryParams: { search: query } });
    } else {
      this.router.navigate(['/products']);
    }
  }

  subscribeNewsletter(event: Event) {
    event.preventDefault();
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const email = emailInput.value.trim();
    if (email) {
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      emailInput.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
