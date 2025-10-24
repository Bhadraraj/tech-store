import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Premium Laptop',
      price: 1299.99,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      description: 'High-performance laptop for professionals',
      fullDescription: 'A powerful laptop featuring the latest processor, 16GB RAM, 512GB SSD, and stunning display. Perfect for work, gaming, and creative tasks.'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 249.99,
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Noise-canceling wireless headphones',
      fullDescription: 'Experience crystal-clear audio with active noise cancellation, 30-hour battery life, and comfortable over-ear design. Premium sound quality for music lovers.'
    },
    {
      id: 3,
      name: 'Smart Watch',
      price: 399.99,
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Feature-rich smartwatch with health tracking',
      fullDescription: 'Stay connected and healthy with this advanced smartwatch featuring heart rate monitoring, GPS, water resistance, and a vibrant AMOLED display.'
    },
    {
      id: 4,
      name: 'Digital Camera',
      price: 899.99,
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Professional mirrorless camera',
      fullDescription: 'Capture stunning photos and 4K videos with this professional-grade camera. 24MP sensor, image stabilization, and interchangeable lens system.'
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      price: 149.99,
      image: 'https://images.pexels.com/photos/1279406/pexels-photo-1279406.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Portable wireless speaker with deep bass',
      fullDescription: 'Enjoy 360-degree sound with this waterproof portable speaker. 12-hour battery life, powerful bass, and connect multiple speakers for immersive audio.'
    },
    {
      id: 6,
      name: 'Gaming Console',
      price: 499.99,
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Next-gen gaming console',
      fullDescription: 'Experience next-generation gaming with stunning graphics, fast load times, and an extensive library of exclusive games. 4K gaming at 120fps.'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
