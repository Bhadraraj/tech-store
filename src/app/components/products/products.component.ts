import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="products-container">
      <div class="products-header">
        <h1>Our Products</h1>
        <p>Explore our collection of premium technology products</p>
      </div>

      <div class="products-grid">
        <div class="product-card" *ngFor="let product of products">
          <div class="product-image">
            <img [src]="product.image" [alt]="product.name" loading="lazy">
          </div>
          <div class="product-content">
            <h3>{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price">\${{ product.price.toFixed(2) }}</span>
              <a [routerLink]="['/products', product.id]" class="btn-details">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
      min-height: calc(100vh - 70px);
    }

    .products-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .products-header h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .products-header p {
      font-size: 1.2rem;
      color: #718096;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    }

    .product-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: #f7fafc;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image img {
      transform: scale(1.1);
    }

    .product-content {
      padding: 1.5rem;
    }

    .product-content h3 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .product-description {
      color: #718096;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
    }

    .btn-details {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-details:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .products-container {
        padding: 2rem 1rem;
      }

      .products-header h1 {
        font-size: 2rem;
      }

      .products-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
