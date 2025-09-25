# Project Structure

This document provides a detailed overview of the EB Design Werks website project structure.

## 📁 Directory Overview

```
EBDesignWerks-Site/
├── amplify/                    # AWS Amplify backend configuration
│   ├── auth/                   # Authentication setup
│   ├── data/                   # Data models and API
│   ├── functions/              # Lambda functions
│   │   ├── api/               # General API functions
│   │   ├── quote-api/         # Quote handling API
│   │   └── send-quote-request/ # Email sending function
│   └── storage/               # S3 storage configuration
│
├── dist/                      # Production build output (gitignored)
├── docs/                      # Project documentation
├── node_modules/              # Dependencies (gitignored)
├── public/                    # Static assets
│   └── images/               # Public images (logos, icons)
├── src/                       # Source code
│   ├── assets/               # Import-able assets
│   ├── components/           # Reusable React components
│   ├── contexts/             # React context providers
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Utility functions and services
│
├── .gitignore                # Git ignore configuration
├── amplify.yml               # AWS Amplify build configuration
├── amplify_outputs.json      # Amplify frontend configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── README.md                 # Project overview
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite build configuration
```

## 🔍 Key Directories Explained

### `/src` - Application Source Code

#### `/src/components`
- **Layout.tsx/.css**: Main layout wrapper with header and footer
- Contains shared UI components used across multiple pages

#### `/src/pages`
- **Home.tsx/.css**: Landing page with hero section and service overview
- **Services.tsx/.css**: Detailed service listings and pricing
- **Portfolio.tsx/.css**: Project showcase (placeholder for future content)
- **About.tsx/.css**: Company information and values
- **QuoteRequest.tsx/.css**: Contact form with file upload capability

#### `/src/utils`
- **config.ts**: Application configuration and constants
- **servicesData.ts**: Service definitions and details
- **emailService.ts**: EmailJS integration for contact form
- **amplifyService.ts**: AWS Amplify service configuration

#### `/src/types`
- **index.ts**: TypeScript type definitions for the application

### `/amplify` - Backend Configuration

#### `/amplify/functions`
- **send-quote-request/**: Lambda function for processing quote requests
  - Handles email sending via AWS SES
  - Processes form data and attachments

#### `/amplify/auth`
- Authentication configuration using AWS Cognito
- User pool and identity pool setup

#### `/amplify/storage`
- S3 bucket configuration for file uploads
- Access rules for authenticated/unauthenticated users

### `/public` - Static Assets
- Files served directly without processing
- Contains logos, icons, and other static images
- Accessible via root path (e.g., `/images/logo.png`)

## 📋 Important Files

### Configuration Files
- **amplify.yml**: Defines build and deployment settings for AWS Amplify
- **vite.config.ts**: Vite bundler configuration
- **tsconfig.json**: TypeScript compiler options
- **package.json**: Dependencies and npm scripts

### Frontend Entry Points
- **index.html**: Main HTML file with app mount point
- **src/main.tsx**: React application entry point
- **src/App.tsx**: Root React component with routing

### Styling
- **src/index.css**: Global styles and CSS variables
- **src/App.css**: Application-wide styles
- Component-specific CSS files alongside components

## 🔧 Development Files

### Environment Variables
- **.env.template**: Template for environment variables
- **.env.local**: Local environment configuration (gitignored)

### Build Output
- **dist/**: Production build files (gitignored)
- **amplify_outputs.json**: Auto-generated Amplify configuration

## 📝 Documentation
- **README.md**: Project overview and setup instructions
- **docs/**: Additional documentation
  - PROJECT_STRUCTURE.md (this file)
  - EDITING_GUIDE.md
  - DEPLOYMENT.md
