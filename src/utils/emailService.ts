import emailjs from '@emailjs/browser';
import { config } from './config';

interface EmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  projectDescription: string;
  timeline?: string;
  budget?: string;
  attachmentUrls?: string[];
}

export const sendQuoteRequest = async (data: EmailData): Promise<void> => {
  try {
    // Initialize EmailJS with public key
    emailjs.init(config.emailjs.publicKey);
    
    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Not provided',
      company: data.company || 'Not provided',
      service: data.service,
      project_description: data.projectDescription,
      timeline: data.timeline || 'Not specified',
      budget: data.budget || 'Not specified',
      attachments: data.attachmentUrls?.join('\n') || 'No attachments',
      to_email: config.contact.email,
    };
    
    // Send email using EmailJS
    const response = await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      templateParams
    );
    
    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send quote request. Please try again or contact us directly.');
  }
};
