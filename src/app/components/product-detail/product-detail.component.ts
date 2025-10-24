import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-detail-container">
      <div *ngIf="product" class="product-detail">
        <div class="product-detail-image">
          <img [src]="product.image" [alt]="product.name">
        </div>
        <div class="product-detail-info">
          <h1>{{ product.name }}</h1>
          <div class="price">\${{ product.price.toFixed(2) }}</div>
          <p class="description">{{ product.fullDescription }}</p>
          <div class="actions">
            <button class="btn btn-primary">Add to Cart</button>
            <a routerLink="/contact" class="btn btn-secondary">Enquire Now</a>
          </div>
          <a routerLink="/products" class="back-link">← Back to Products</a>
        </div>
      </div>
      <div *ngIf="!product" class="not-found">
        <h2>Product not found</h2>
        <a routerLink="/products" class="btn btn-primary">Browse Products</a>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
      min-height: calc(100vh - 70px);
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .product-detail-image {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .product-detail-image img {
      width: 100%;
      height: auto;
      display: block;
    }

    .product-detail-info h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 2rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 1.5rem;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #4a5568;
      margin-bottom: 2rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .btn-secondary:hover {
      background: #667eea;
      color: white;
    }

    .back-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      display: inline-block;
      transition: all 0.3s ease;
    }

    .back-link:hover {
      transform: translateX(-5px);
    }

    .not-found {
      text-align: center;
      padding: 4rem 2rem;
    }

    .not-found h2 {
      font-size: 2rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 768px) {
      .product-detail-container {
        padding: 2rem 1rem;
      }

      .product-detail {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .product-detail-info h1 {
        font-size: 2rem;
      }

      .actions {
        flex-direction: column;
      }

      .btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }
}
