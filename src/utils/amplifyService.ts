import { uploadData } from 'aws-amplify/storage';

interface QuoteRequestData {
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

/**
 * Upload files to S3 and return their keys
 */
const uploadFiles = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(async (file) => {
    const key = `quote-uploads/${Date.now()}-${file.name}`;
    
    try {
      const result = await uploadData({
        key,
        data: file,
        options: {
          contentType: file.type,
        }
      }).result;
      
      return result.key;
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
      throw error;
    }
  });
  
  return Promise.all(uploadPromises);
};

/**
 * Send quote request via AWS services
 */
export const sendQuoteRequestAWS = async (data: QuoteRequestData): Promise<void> => {
  try {
    let attachmentKeys: string[] = [];
    
    // Upload attachments if any
    if (data.attachments && data.attachments.length > 0) {
      attachmentKeys = await uploadFiles(data.attachments);
    }
    
    // Prepare request body
    const requestBody = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      company: data.company || '',
      service: data.service,
      projectDescription: data.projectDescription,
      timeline: data.timeline || 'Not specified',
      budget: data.budget || 'Not specified',
      attachmentKeys
    };
    
    // Get the Lambda function URL from Amplify configuration
    const { Amplify } = await import('aws-amplify');
    const config = Amplify.getConfig();
    const functionUrl = (config as any)?.custom?.sendQuoteRequestUrl;
    
    if (!functionUrl) {
      console.error('Lambda function URL not configured');
      throw new Error('Email service is not properly configured. Please contact us directly at ebdesignwerks@gmail.com');
    }
    
    // Call the Lambda function via HTTP
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Lambda function error:', errorData);
      throw new Error(errorData.message || 'Failed to send quote request');
    }
    
    const result = await response.json();
    console.log('Quote request sent successfully:', result);
  } catch (error) {
    console.error('Error sending quote request:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send quote request. Please try again or contact us directly.');
  }
};

/**
 * Initialize AWS Amplify (call this in your main app)
 */
export const initializeAmplify = async () => {
  try {
    const { Amplify } = await import('aws-amplify');
    
    // Fetch the configuration from the public directory
    const response = await fetch('/amplify_outputs.json');
    if (!response.ok) {
      throw new Error(`Failed to load Amplify configuration: ${response.statusText}`);
    }
    
    const outputs = await response.json();
    
    Amplify.configure(outputs);
    console.log('Amplify initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Amplify:', error);
    console.warn('Amplify configuration not found. AWS features may be unavailable.');
  }
};