import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enquiry, EnquiryResponse } from '../models/enquiry.model';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private apiUrl = 'https://tech-store-api.vercel.app/api';

  constructor(private http: HttpClient) {}

  submitEnquiry(enquiry: Enquiry): Observable<any> {
    return this.http.post(this.apiUrl, enquiry);
  }

  getEnquiries(page: number = 1, limit: number = 10): Observable<EnquiryResponse> {
    return this.http.get<EnquiryResponse>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
