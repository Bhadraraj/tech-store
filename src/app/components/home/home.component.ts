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
      min-height: 100vh;
      width: 100%;
      overflow-x: hidden;
    }

    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 1rem;
      text-align: center;
      width: 100%;
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
      padding: 0 1rem;
    }

    .hero-title {
      font-size: clamp(1.75rem, 5vw, 3.5rem);
      font-weight: 700;
      margin-bottom: 1rem;
      animation: fadeInUp 0.8s ease;
      line-height: 1.2;
      word-wrap: break-word;
    }

    .hero-subtitle {
      font-size: clamp(0.95rem, 3vw, 1.5rem);
      margin-bottom: 2rem;
      opacity: 0.95;
      animation: fadeInUp 0.8s ease 0.2s backwards;
      line-height: 1.5;
      padding: 0 1rem;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      animation: fadeInUp 0.8s ease 0.4s backwards;
    }

    .btn {
      padding: 0.875rem 1.75rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
      text-align: center;
      font-size: 1rem;
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

      .btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.95rem;
      }
    }

    @media (max-width: 480px) {
      .hero {
        padding: 3rem 0.75rem;
      }

      .hero-subtitle {
        padding: 0;
        margin-bottom: 1.5rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: stretch;
        gap: 0.75rem;
        padding: 0 1rem;
      }

      .btn {
        width: 100%;
        padding: 1rem;
      }
    }

    @media (max-width: 360px) {
      .hero {
        padding: 2.5rem 0.5rem;
      }
    }
  `]
})
export class HomeComponent {}