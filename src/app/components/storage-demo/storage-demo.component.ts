import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-storage-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="storage-container">
      <div class="storage-header">
        <h1>Types of Storage</h1>
        <p>Local Storage, Session Storage, and Cookies</p>
      </div>

      <div class="storage-sections">
        <div class="storage-section">
          <h2>Local Storage</h2>
          <div class="storage-controls">
            <div class="input-group">
              <input
                type="text"
                [(ngModel)]="localStorage.key"
                placeholder="Key"
                class="form-control"
              >
              <input
                type="text"
                [(ngModel)]="localStorage.value"
                placeholder="Value"
                class="form-control"
              >
            </div>
            <div class="button-group">
              <button (click)="setLocalStorage()" class="btn btn-set">Set</button>
              <button (click)="getLocalStorage()" class="btn btn-get">Get</button>
              <button (click)="deleteLocalStorage()" class="btn btn-delete">Delete</button>
            </div>
            <div *ngIf="localStorage.result" class="result-box">
              <strong>Result:</strong> {{ localStorage.result }}
            </div>
          </div>
        </div>

        <div class="storage-section">
          <h2>Session Storage</h2>
          <div class="storage-controls">
            <div class="input-group">
              <input
                type="text"
                [(ngModel)]="sessionStorage.key"
                placeholder="Key"
                class="form-control"
              >
              <input
                type="text"
                [(ngModel)]="sessionStorage.value"
                placeholder="Value"
                class="form-control"
              >
            </div>
            <div class="button-group">
              <button (click)="setSessionStorage()" class="btn btn-set">Set</button>
              <button (click)="getSessionStorage()" class="btn btn-get">Get</button>
              <button (click)="deleteSessionStorage()" class="btn btn-delete">Delete</button>
            </div>
            <div *ngIf="sessionStorage.result" class="result-box">
              <strong>Result:</strong> {{ sessionStorage.result }}
            </div>
          </div>
        </div>

        <div class="storage-section">
          <h2>Cookies</h2>
          <div class="storage-controls">
            <div class="input-group">
              <input
                type="text"
                [(ngModel)]="cookies.key"
                placeholder="Key"
                class="form-control"
              >
              <input
                type="text"
                [(ngModel)]="cookies.value"
                placeholder="Value"
                class="form-control"
              >
              <input
                type="number"
                [(ngModel)]="cookies.days"
                placeholder="Days"
                class="form-control small"
                min="1"
              >
            </div>
            <div class="button-group">
              <button (click)="setCookie()" class="btn btn-set">Set</button>
              <button (click)="getCookie()" class="btn btn-get">Get</button>
              <button (click)="deleteCookie()" class="btn btn-delete">Delete</button>
            </div>
            <div *ngIf="cookies.result" class="result-box">
              <strong>Result:</strong> {{ cookies.result }}
            </div>
          </div>
        </div>
      </div>

    
    </div>
  `,
  styles: [`
    .storage-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
      min-height: calc(100vh - 70px);
    }

    .storage-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .storage-header h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .storage-header p {
      font-size: 1.2rem;
      color: #718096;
    }

    .storage-sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .storage-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .storage-section h2 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .storage-controls {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .form-control {
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-control.small {
      width: 100px;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
    }

    .btn-set {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    }

    .btn-get {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .btn-delete {
      background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    }

    .result-box {
      background: #edf2f7;
      padding: 1rem;
      border-radius: 8px;
      color: #2d3748;
      word-break: break-word;
    }

    .info-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .info-section h3 {
      font-size: 1.8rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-card {
      background: #f7fafc;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }

    .info-card h4 {
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .info-card p {
      color: #4a5568;
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 768px) {
      .storage-container {
        padding: 2rem 1rem;
      }

      .storage-header h1 {
        font-size: 2rem;
      }

      .storage-sections {
        grid-template-columns: 1fr;
      }

      .button-group {
        flex-direction: column;
      }
    }
  `]
})
export class StorageDemoComponent {
  localStorage = { key: '', value: '', result: '' };
  sessionStorage = { key: '', value: '', result: '' };
  cookies = { key: '', value: '', days: 7, result: '' };

  constructor(private storageService: StorageService) {}

  setLocalStorage(): void {
    if (this.localStorage.key && this.localStorage.value) {
      this.storageService.setLocalStorage(this.localStorage.key, this.localStorage.value);
      this.localStorage.result = `Successfully set "${this.localStorage.key}" = "${this.localStorage.value}"`;
    } else {
      this.localStorage.result = 'Please provide both key and value';
    }
  }

  getLocalStorage(): void {
    if (this.localStorage.key) {
      const value = this.storageService.getLocalStorage(this.localStorage.key);
      this.localStorage.result = value !== null ? `Value: ${value}` : 'Key not found';
    } else {
      this.localStorage.result = 'Please provide a key';
    }
  }

  deleteLocalStorage(): void {
    if (this.localStorage.key) {
      this.storageService.deleteLocalStorage(this.localStorage.key);
      this.localStorage.result = `Deleted key "${this.localStorage.key}"`;
    } else {
      this.localStorage.result = 'Please provide a key';
    }
  }

  setSessionStorage(): void {
    if (this.sessionStorage.key && this.sessionStorage.value) {
      this.storageService.setSessionStorage(this.sessionStorage.key, this.sessionStorage.value);
      this.sessionStorage.result = `Successfully set "${this.sessionStorage.key}" = "${this.sessionStorage.value}"`;
    } else {
      this.sessionStorage.result = 'Please provide both key and value';
    }
  }

  getSessionStorage(): void {
    if (this.sessionStorage.key) {
      const value = this.storageService.getSessionStorage(this.sessionStorage.key);
      this.sessionStorage.result = value !== null ? `Value: ${value}` : 'Key not found';
    } else {
      this.sessionStorage.result = 'Please provide a key';
    }
  }

  deleteSessionStorage(): void {
    if (this.sessionStorage.key) {
      this.storageService.deleteSessionStorage(this.sessionStorage.key);
      this.sessionStorage.result = `Deleted key "${this.sessionStorage.key}"`;
    } else {
      this.sessionStorage.result = 'Please provide a key';
    }
  }

  setCookie(): void {
    if (this.cookies.key && this.cookies.value) {
      this.storageService.setCookie(this.cookies.key, this.cookies.value, this.cookies.days);
      this.cookies.result = `Successfully set cookie "${this.cookies.key}" = "${this.cookies.value}" (expires in ${this.cookies.days} days)`;
    } else {
      this.cookies.result = 'Please provide both key and value';
    }
  }

  getCookie(): void {
    if (this.cookies.key) {
      const value = this.storageService.getCookie(this.cookies.key);
      this.cookies.result = value !== null ? `Value: ${value}` : 'Cookie not found';
    } else {
      this.cookies.result = 'Please provide a key';
    }
  }

  deleteCookie(): void {
    if (this.cookies.key) {
      this.storageService.deleteCookie(this.cookies.key);
      this.cookies.result = `Deleted cookie "${this.cookies.key}"`;
    } else {
      this.cookies.result = 'Please provide a key';
    }
  }
}
