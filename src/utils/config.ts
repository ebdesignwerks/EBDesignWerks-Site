// Configuration for EB Design Werks

export const config = {
  // EmailJS Configuration - YOU NEED TO SET THESE IN AWS AMPLIFY ENVIRONMENT VARIABLES
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
  
  // Contact Information
  contact: {
    email: 'ebdesignwerks@gmail.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '',
    address: import.meta.env.VITE_CONTACT_ADDRESS || 'Ohio, USA',
  },
  
  // AWS Configuration (if needed for future features)
  aws: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
  },
  
  // Business Information
  business: {
    name: 'EB Design Werks',
    tagline: 'Custom 3D Scanning, Printing & Light Manufacturing',
    description: 'End-to-end digital fabrication services that turn physical objects or ideas into accurate digital models and functional parts.',
  },
  
  // Social Media Links (add as needed)
  social: {
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || '',
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || '',
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || '',
    youtube: import.meta.env.VITE_SOCIAL_YOUTUBE || '',
    tiktok: import.meta.env.VITE_SOCIAL_TIKTOK || '',
  },
};
