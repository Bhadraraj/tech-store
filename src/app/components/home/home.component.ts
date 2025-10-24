import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to TechStore</h1>
          <p class="hero-subtitle">Discover the latest technology products at amazing prices</p>
          <div class="hero-buttons">
            <a routerLink="/products" class="btn btn-primary">Browse Products</a>
            <a routerLink="/contact" class="btn btn-secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: calc(100vh - 70px);
    }

    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8rem 2rem;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      animation: fadeInUp 0.8s ease;
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.95;
      animation: fadeInUp 0.8s ease 0.2s backwards;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      animation: fadeInUp 0.8s ease 0.4s backwards;
    }

    .btn {
      padding: 1rem 2rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary {
      background: white;
      color: #667eea;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }

    .btn-secondary {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 2px solid white;
    }

    .btn-secondary:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .hero {
        padding: 4rem 1rem;
      }

      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.2rem;
      }
    }
  `]
})
export class HomeComponent {}
