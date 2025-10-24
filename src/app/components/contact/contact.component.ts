import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact-container">
      <div class="contact-header">
        <h1>Contact Us</h1>
        <p>Have a question? We'd love to hear from you.</p>
      </div>

      <div class="contact-content">
        <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
          <div class="form-group">
            <label for="name">Name *</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              class="form-control"
              [class.error]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
              placeholder="Enter your name"
            >
            <div class="error-message" *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              [class.error]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
              placeholder="Enter your email"
            >
            <div class="error-message" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
              <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required</span>
              <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email</span>
            </div>
          </div>

          <div class="form-group">
            <label for="mobile">Mobile *</label>
            <input
              type="tel"
              id="mobile"
              formControlName="mobile"
              class="form-control"
              [class.error]="contactForm.get('mobile')?.invalid && contactForm.get('mobile')?.touched"
              placeholder="Enter your mobile number"
            >
            <div class="error-message" *ngIf="contactForm.get('mobile')?.invalid && contactForm.get('mobile')?.touched">
              <span *ngIf="contactForm.get('mobile')?.errors?.['required']">Mobile number is required</span>
              <span *ngIf="contactForm.get('mobile')?.errors?.['pattern']">Please enter a valid 10-digit mobile number</span>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message *</label>
            <textarea
              id="message"
              formControlName="message"
              class="form-control"
              [class.error]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
              placeholder="Enter your message"
              rows="5"
            ></textarea>
            <div class="error-message" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
              Message is required
            </div>
          </div>

          <button type="submit" class="btn btn-submit" [disabled]="contactForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit Enquiry' }}
          </button>

          <div *ngIf="submitMessage" class="submit-message" [class.success]="submitSuccess" [class.error]="!submitSuccess">
            {{ submitMessage }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 3rem 2rem;
      min-height: calc(100vh - 70px);
    }

    .contact-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .contact-header h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .contact-header p {
      font-size: 1.2rem;
      color: #718096;
    }

    .contact-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2d3748;
      font-weight: 600;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control.error {
      border-color: #f56565;
    }

    .error-message {
      color: #f56565;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 120px;
    }

    .btn-submit {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-submit:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .submit-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
    }

    .submit-message.success {
      background: #c6f6d5;
      color: #22543d;
    }

    .submit-message.error {
      background: #fed7d7;
      color: #742a2a;
    }

    @media (max-width: 768px) {
      .contact-container {
        padding: 2rem 1rem;
      }

      .contact-header h1 {
        font-size: 2rem;
      }

      .contact-form {
        padding: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private enquiryService: EnquiryService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      this.enquiryService.submitEnquiry(this.contactForm.value).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = 'Thank you! Your enquiry has been submitted successfully.';
          this.contactForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = 'Failed to submit enquiry. Please try again.';
          this.isSubmitting = false;
        }
      });
    }
  }
}
