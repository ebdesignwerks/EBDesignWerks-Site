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

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Email Service**: EmailJS
- **Styling**: Custom CSS with responsive design
- **Deployment**: AWS Amplify

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
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
   - Copy `.env.template` to `.env.local`
   - Fill in your EmailJS credentials and other configuration

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

The default Amplify build settings should work, but here's the configuration for reference:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
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
│   └── emailService.ts
├── types/          # TypeScript type definitions
└── App.tsx         # Main app component
```

## 🎨 Customization

### Adding New Services
Edit `src/utils/servicesData.ts` to add or modify services.

### Updating Contact Information
Update the configuration in `src/utils/config.ts` or use environment variables.

### Styling
- Global styles: `src/index.css`
- Component-specific styles: Located next to each component
- Color scheme: Defined in CSS variables in `index.css`

### Adding Portfolio Items
The portfolio section is ready for content. You can add projects by:
1. Creating a portfolio data file similar to `servicesData.ts`
2. Building a portfolio grid component
3. Adding project detail pages if needed

## 🔄 Continuous Deployment

Any push to the `main` branch will automatically trigger a new build and deployment in AWS Amplify.

## 📝 Future Enhancements

- [ ] Implement actual file upload to AWS S3
- [ ] Add Amplify Studio for content management
- [ ] Create dynamic portfolio with project details
- [ ] Add blog functionality
- [ ] Implement customer testimonials section
- [ ] Add analytics tracking
- [ ] Create admin dashboard for content updates

## 🤝 Support

For questions about the website, contact: ebdesignwerks@gmail.com

## 📄 License

© 2025 EB Design Werks. All rights reserved.