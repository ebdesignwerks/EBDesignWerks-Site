// Type definitions for EB Design Werks

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  pricing: {
    minimum?: number;
    hourly?: number;
    factors?: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  services: string[];
  date: string;
  featured: boolean;
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  projectDescription: string;
  timeline?: string;
  budget?: string;
  attachments?: File[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
  hours?: {
    [key: string]: string;
  };
}
