import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'ShopSmart';

  ngOnInit() {
    // Hide loading screen after component initializes
    setTimeout(() => {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.style.display = 'none';
      }
    }, 2000);

    // Add scroll event listener for header
    this.onScroll();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const header = document.getElementById('main-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }
}
