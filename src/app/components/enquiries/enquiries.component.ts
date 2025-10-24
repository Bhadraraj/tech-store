import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryService } from '../../services/enquiry.service';
import { Enquiry } from '../../models/enquiry.model';

@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="enquiries-container">
      <div class="enquiries-header">
        <h1>Enquiries List</h1>
        <p>View all submitted enquiries</p>
      </div>

      <div *ngIf="loading" class="loading">Loading enquiries...</div>

      <div *ngIf="error" class="error-box">
        {{ error }}
      </div>

      <div *ngIf="!loading && enquiries.length > 0" class="enquiries-list">
        <div class="enquiry-card" *ngFor="let enquiry of enquiries">
          <div class="enquiry-header">
            <h3>{{ enquiry.name }}</h3>
            <span class="enquiry-date">{{ formatDate(enquiry.created_at) }}</span>
          </div>
          <div class="enquiry-details">
            <p><strong>Email:</strong> {{ enquiry.email }}</p>
            <p><strong>Mobile:</strong> {{ enquiry.mobile }}</p>
            <p><strong>Message:</strong> {{ enquiry.message }}</p>
          </div>
        </div>
      </div>

      <div *ngIf="!loading && enquiries.length === 0 && !error" class="no-enquiries">
        <p>No enquiries found.</p>
      </div>

      <div *ngIf="pagination.totalPages > 1" class="pagination">
        <button
          class="btn-page"
          (click)="goToPage(pagination.page - 1)"
          [disabled]="pagination.page === 1"
        >
          Previous
        </button>
        <span class="page-info">
          Page {{ pagination.page }} of {{ pagination.totalPages }}
        </span>
        <button
          class="btn-page"
          (click)="goToPage(pagination.page + 1)"
          [disabled]="pagination.page === pagination.totalPages"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .enquiries-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
      min-height: calc(100vh - 70px);
    }

    .enquiries-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .enquiries-header h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .enquiries-header p {
      font-size: 1.2rem;
      color: #718096;
    }

    .loading {
      text-align: center;
      padding: 3rem;
      font-size: 1.2rem;
      color: #718096;
    }

    .error-box {
      background: #fed7d7;
      color: #742a2a;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      text-align: center;
    }

    .enquiries-list {
      display: grid;
      gap: 1.5rem;
    }

    .enquiry-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }

    .enquiry-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }

    .enquiry-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .enquiry-header h3 {
      font-size: 1.5rem;
      color: #2d3748;
      margin: 0;
    }

    .enquiry-date {
      color: #718096;
      font-size: 0.9rem;
    }

    .enquiry-details p {
      margin: 0.75rem 0;
      color: #4a5568;
      line-height: 1.6;
    }

    .enquiry-details strong {
      color: #2d3748;
      margin-right: 0.5rem;
    }

    .no-enquiries {
      text-align: center;
      padding: 4rem 2rem;
      color: #718096;
      font-size: 1.2rem;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 3rem;
    }

    .btn-page {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-page:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-page:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .page-info {
      color: #2d3748;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .enquiries-container {
        padding: 2rem 1rem;
      }

      .enquiries-header h1 {
        font-size: 2rem;
      }

      .enquiry-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .enquiry-card {
        padding: 1rem;
      }
    }
  `]
})
export class EnquiriesComponent implements OnInit {
  enquiries: Enquiry[] = [];
  loading = true;
  error = '';
  pagination = {
    page: 1,
    limit: 1,
    total: 0,
    totalPages: 1
  };

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(): void {
    this.loading = true;
    this.error = '';

    this.enquiryService.getEnquiries(this.pagination.page, this.pagination.limit).subscribe({
      next: (response) => {
        this.enquiries = response.data;
        this.pagination = response.pagination;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load enquiries. Please make sure the backend server is running.';
        this.loading = false;
      }
    });
  }

  goToPage(page: number): void {
    this.pagination.page = page;
    this.loadEnquiries();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
