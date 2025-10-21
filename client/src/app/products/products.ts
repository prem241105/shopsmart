import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Product {
  name: string;
  prices: { store: string; price: number }[];
  image: string;
  description?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.http.get<{ title: string; products: Product[] }>('/api/products', { withCredentials: true }).subscribe(data => {
      this.products = data.products;
      this.filteredProducts = data.products;

      // Check for search query param
      this.route.queryParams.subscribe(params => {
        const search = params['search'];
        if (search) {
          this.filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
        }
      });
    });
  }

  filterProducts(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
  }

  sortProducts(event: Event) {
    const sortBy = (event.target as HTMLSelectElement).value;
    if (sortBy === 'name') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price-low') {
      this.filteredProducts.sort((a, b) => {
        const aMinPrice = Math.min(...a.prices.map(p => p.price));
        const bMinPrice = Math.min(...b.prices.map(p => p.price));
        return aMinPrice - bMinPrice;
      });
    } else if (sortBy === 'price-high') {
      this.filteredProducts.sort((a, b) => {
        const aMinPrice = Math.min(...a.prices.map(p => p.price));
        const bMinPrice = Math.min(...b.prices.map(p => p.price));
        return bMinPrice - aMinPrice;
      });
    }
  }

  showProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  closeModal() {
    this.selectedProduct = null;
  }
}
