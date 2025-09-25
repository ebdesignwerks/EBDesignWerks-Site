# Deployment Guide

This guide covers deployment and hosting of the EB Design Werks website on AWS Amplify.

## 🚀 Quick Deploy

The site automatically deploys when you push to the `main` branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

## 📋 Prerequisites

- GitHub repository connected to AWS Amplify
- AWS account with Amplify access
- Environment variables configured in Amplify Console

## 🔧 Initial Setup

### 1. Repository Setup

Ensure your repository has these files:
- `amplify.yml` - Build configuration
- `amplify_outputs.json` - Frontend configuration
- `package.json` - Dependencies and scripts

### 2. AWS Amplify Configuration

#### Build Settings (amplify.yml)
```yaml
version: 1
applications:
  - appRoot: .
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci
            # Using existing amplify_outputs.json
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

#### Environment Variables

Set in Amplify Console → App settings → Environment variables:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_COMPANY_EMAIL=ebdesignwerks@gmail.com
VITE_COMPANY_PHONE=(320) 266-9091
```

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Add Domain in Amplify**:
   - Go to Domain management
   - Click "Add domain"
   - Enter your domain (e.g., ebdesignwerks.com)

2. **DNS Configuration**:
   - Add provided CNAME records to your DNS provider
   - Wait for SSL certificate validation (15-30 minutes)

3. **Subdomain Setup**:
   - www.ebdesignwerks.com → redirects to main domain
   - Additional subdomains as needed

## 📊 Monitoring & Logs

### Build Monitoring

1. **Amplify Console Dashboard**:
   - View build status
   - Check deployment history
   - Monitor build times

2. **Build Logs**:
   - Available for each deployment
   - Shows detailed build process
   - Helps debug failures

### Common Build Issues

#### CSS Minification Error
**Solution**: Already fixed in `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: false
  }
})
```

#### Permissions Error
**Solution**: Using committed `amplify_outputs.json` instead of regenerating

#### Missing Dependencies
**Solution**: Ensure all dependencies are in `package.json`:
```bash
npm install --save missing-package
```

## 🔄 Deployment Workflow

### Development → Production

1. **Local Development**:
   ```bash
   npm run dev
   # Make changes
   npm run build  # Test build locally
   ```

2. **Stage Changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Deploy**:
   ```bash
   git push origin main
   ```

4. **Verify**:
   - Check Amplify Console for build status
   - Test live site functionality
   - Monitor for errors

### Rollback Process

If deployment causes issues:

1. **Via Git**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Via Amplify Console**:
   - Go to deployment history
   - Click "Redeploy this version" on previous working deployment

## 🛡️ Security Best Practices

### Environment Variables
- Never commit sensitive data
- Use Amplify environment variables
- Rotate keys periodically

### Build Configuration
- Keep `amplify_outputs.json` up to date
- Review build logs for warnings
- Monitor for security updates

### Access Control
- Limit AWS IAM permissions
- Use least privilege principle
- Enable MFA on AWS account

## 📈 Performance Optimization

### Build Optimization
- CSS minification disabled (due to issue)
- JavaScript bundling optimized by Vite
- Image optimization before upload

### Caching Strategy
- Static assets cached by CloudFront
- Build artifacts cached in Amplify
- Browser caching headers configured

### Monitoring Performance
1. Use AWS CloudWatch
2. Monitor build times
3. Check page load speeds
4. Review error rates

## 🔍 Troubleshooting

### Build Failures

1. **Check Build Logs**:
   - Detailed error messages
   - Missing dependencies
   - TypeScript errors

2. **Common Fixes**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Test build locally
   npm run build
   ```

### Deployment Not Updating

1. **Verify Git Push**:
   ```bash
   git status
   git log --oneline -5
   ```

2. **Check Amplify Console**:
   - Is build triggered?
   - Any webhooks disabled?

3. **Force Redeploy**:
   - In Amplify Console
   - Click "Redeploy this version"

### Environment Variable Issues

1. **Verify in Amplify Console**:
   - All variables present
   - No typos in names
   - Values correctly formatted

2. **Test Locally**:
   ```bash
   # Create .env.local with same vars
   npm run dev
   ```

## 📝 Maintenance

### Regular Tasks

1. **Weekly**:
   - Check build status
   - Review error logs
   - Monitor performance

2. **Monthly**:
   - Update dependencies
   - Review security alerts
   - Backup important data

3. **Quarterly**:
   - Audit environment variables
   - Review AWS costs
   - Update documentation

### Dependency Updates

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Test thoroughly
npm run build
npm run preview
```

## 🆘 Support Resources

- **AWS Amplify Docs**: https://docs.amplify.aws/
- **Build Issues**: Check Amplify Console logs
- **App Issues**: Browser console and network tab
- **Contact**: ebdesignwerks@gmail.com

## 📌 Important Notes

1. **Build Configuration**: The `amplify.yml` is crucial - don't modify without testing
2. **Environment Variables**: Required for EmailJS functionality
3. **CSS Minification**: Currently disabled due to compatibility issues
4. **Git Workflow**: All deployments through main branch pushes
5. **Monitoring**: Regular checks prevent issues from escalating
