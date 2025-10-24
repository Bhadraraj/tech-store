import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h2>TechStore</h2>
        </div>
        <button class="nav-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-menu" [class.active]="isMenuOpen">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Home</a></li>
          <li><a routerLink="/products" routerLinkActive="active" (click)="closeMenu()">Products</a></li>
          <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>
          <li><a routerLink="/enquiries" routerLinkActive="active" (click)="closeMenu()">Enquiries</a></li>
          <li><a routerLink="/storage-demo" routerLinkActive="active" (click)="closeMenu()">Storage Types</a></li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      padding: 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }

    .nav-brand h2 {
      color: white;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .nav-toggle {
      display: none;
      flex-direction: column;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }

    .nav-toggle span {
      width: 25px;
      height: 3px;
      background: white;
      margin: 3px 0;
      transition: 0.3s;
      border-radius: 3px;
    }

    .nav-menu {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 2rem;
    }

    .nav-menu li a {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
      display: block;
    }

    .nav-menu li a:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .nav-menu li a.active {
      background: rgba(255,255,255,0.2);
    }

    @media (max-width: 768px) {
      .nav-toggle {
        display: flex;
      }

      .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }

      .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        width: 100%;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0,0,0,0.05);
        padding: 2rem 0;
        gap: 0;
      }

      .nav-menu.active {
        left: 0;
      }

      .nav-menu li {
        margin: 0.5rem 0;
      }

      .nav-menu li a {
        padding: 1rem;
        width: 100%;
      }
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
