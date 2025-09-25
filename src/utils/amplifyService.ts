import { uploadData } from 'aws-amplify/storage';
import { post } from 'aws-amplify/api';

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
    
    // Prepare request body - ensure all fields are defined
    const requestBody = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',  // Provide default empty string
      company: data.company || '',  // Provide default empty string
      service: data.service,
      projectDescription: data.projectDescription,
      timeline: data.timeline || 'Not specified',  // Provide default value
      budget: data.budget || 'Not specified',  // Provide default value
      attachmentKeys
    };
    
    // Send to Lambda via API Gateway
    const response = await post({
      apiName: 'QuoteRequestApi',
      path: '/quote-request',
      options: {
        body: requestBody
      }
    }).response;
    
    const responseData = await response.body.json() as { message?: string };
    
    if (!response.statusCode || response.statusCode >= 400) {
      throw new Error(responseData?.message || 'Failed to send quote request');
    }
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
    // Use dynamic import with explicit path for build compatibility
    const configModule = await import(/* @vite-ignore */ '../../amplify_outputs.json');
    const outputs = configModule.default || configModule;
    
    Amplify.configure(outputs);
  } catch (error) {
    console.error('Failed to initialize Amplify:', error);
    // In production, the config might be provided differently
    console.warn('Amplify configuration not found. AWS features may be unavailable.');
  }
};
