# EB Design Werks Website

A modern, responsive website for EB Design Werks - Custom 3D Scanning, Printing & Light Manufacturing services.

## 🚀 Features

- **Responsive Design**: Works beautifully on all devices
- **Service Showcase**: Detailed information about all services offered
- **Quote Request Form**: Contact form with file upload capability
- **Portfolio Section**: Ready for showcasing projects (coming soon)
- **SEO Optimized**: Built with best practices for search engine visibility
- **Fast Performance**: Built with Vite and React for optimal loading speeds

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite (with Rolldown)
- **Routing**: React Router v7
- **Forms**: React Hook Form
- **Email Service**: EmailJS + AWS Lambda
- **Styling**: Custom CSS with responsive design
- **Backend**: AWS Amplify (Auth, Storage, Functions)
- **Deployment**: AWS Amplify Hosting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Git
- AWS Account (for deployment)
- EmailJS Account (for contact form)

## 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ebdesignwerks/EBDesignWerks-Site.git
   cd EBDesignWerks-Site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📧 EmailJS Setup

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{company}}`
   - `{{service}}`
   - `{{project_description}}`
   - `{{timeline}}`
   - `{{budget}}`
   - `{{attachments}}`
   - `{{to_email}}`
4. Get your Service ID, Template ID, and Public Key
5. Add these to your environment variables

## 🏗️ AWS Amplify Backend

The project includes a full AWS Amplify backend with:
- **Authentication**: AWS Cognito for user management
- **Storage**: S3 bucket for file uploads
- **Functions**: Lambda functions for email processing
- **API**: GraphQL API with AWS AppSync

### Backend Development

```bash
# Start local backend sandbox
npm run sandbox

# Deploy backend changes once
npm run sandbox:deploy

# Generate backend outputs
npm run amplify:generate
```

## 🚀 AWS Amplify Deployment

### Initial Setup

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to AWS Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"
   - Choose GitHub and authorize access
   - Select your repository and branch
   - Accept the default build settings
   - Click "Save and deploy"

3. **Configure Environment Variables**
   - In Amplify Console, go to "App settings" → "Environment variables"
   - Add the following variables:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     # Add other optional variables as needed
     ```

4. **Custom Domain (Optional)**
   - Go to "Domain management" in Amplify Console
   - Add your custom domain
   - Follow the DNS configuration instructions

### Build Settings

The project uses a custom `amplify.yml` configuration:

```yaml
version: 1
applications:
  - appRoot: .
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
            - echo "Using existing amplify_outputs.json"
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
```

**Note**: The build uses a pre-committed `amplify_outputs.json` file to avoid permission issues.

## 📁 Project Structure

```
src/
├── components/     # Reusable components
│   └── Layout.tsx  # Main layout with header/footer
├── pages/          # Page components
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Portfolio.tsx
│   ├── About.tsx
│   └── QuoteRequest.tsx
├── utils/          # Utility functions and data
│   ├── config.ts
│   ├── servicesData.ts
│   ├── emailService.ts
│   └── amplifyService.ts
├── types/          # TypeScript type definitions
└── App.tsx         # Main app component

amplify/
├── auth/           # Cognito authentication
├── functions/      # Lambda functions
├── storage/        # S3 configuration
└── data/           # API and data models
```

For detailed structure information, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)

## 🎨 Customization

For detailed editing instructions, see [docs/EDITING_GUIDE.md](docs/EDITING_GUIDE.md)

### Quick Edits

- **Services**: Edit `src/utils/servicesData.ts`
- **Contact Info**: Update `src/utils/config.ts`
- **Styling**: Modify CSS files or CSS variables in `src/index.css`
- **Content**: Edit page components in `src/pages/`

## 🔄 Continuous Deployment

Any push to the `main` branch will automatically trigger a new build and deployment in AWS Amplify.

For detailed deployment information, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 📝 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed directory layout
- [Editing Guide](docs/EDITING_GUIDE.md) - How to make changes
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment and hosting details

## 🚧 Known Issues

- CSS minification is disabled due to compatibility with rolldown-vite
- File uploads are stored locally (S3 integration pending)

## 📈 Future Enhancements

- [x] AWS Amplify backend integration
- [x] File upload capability
- [ ] S3 integration for file storage
- [ ] Dynamic portfolio with CMS
- [ ] Blog functionality
- [ ] Customer testimonials
- [ ] Analytics tracking
- [ ] Admin dashboard

## 🤝 Support

For questions about the website, contact: ebdesignwerks@gmail.com

## 📄 License

© 2025 EB Design Werks. All rights reserved.