export interface Enquiry {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  message: string;
  created_at?: string;
}

export interface EnquiryResponse {
  data: Enquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
