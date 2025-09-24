# AWS Setup Guide for EB Design Werks

This guide explains how to set up and deploy the AWS backend services for the quote request system.

## Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI configured locally
3. Node.js 16+ installed
4. Git repository connected to AWS Amplify

## Architecture Overview

The application uses the following AWS services:

- **AWS Amplify**: Hosting and CI/CD
- **Amazon S3**: File storage for quote attachments
- **AWS Lambda**: Serverless functions for processing quote requests
- **Amazon SES**: Email service for sending notifications
- **API Gateway**: REST API endpoint for the frontend

## Initial Setup

### 1. Configure Amazon SES

Before the email functionality works, you must:

1. **Verify Your Email Domain**:
   ```bash
   aws ses verify-domain-identity --domain ebdesignwerks.com --region us-east-1
   ```

2. **Verify Email Addresses** (if in SES sandbox):
   ```bash
   aws ses verify-email-identity --email-address ebdesignwerks@gmail.com --region us-east-1
   ```

3. **Request Production Access**:
   - Go to AWS SES Console
   - Navigate to "Account dashboard"
   - Click "Request production access"
   - Fill out the form explaining your use case

### 2. Local Development Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Amplify sandbox**:
   ```bash
   npx ampx sandbox
   ```
   This will:
   - Deploy backend resources to your AWS account
   - Generate `amplify_outputs.json` for frontend configuration
   - Watch for changes and auto-deploy

3. **Start the development server**:
   ```bash
   npm run dev
   ```

### 3. Production Deployment

The app is configured for automatic deployment via AWS Amplify:

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Amplify will automatically**:
   - Build the frontend
   - Deploy backend resources
   - Update the hosting

## Environment Variables

### Required in AWS Amplify Console:

```
# EmailJS (for fallback/local development)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Keep monorepo settings
AMPLIFY_DIFF_DEPLOY=false
AMPLIFY_MONOREPO_APP_ROOT=.
```

### Backend Environment Variables (auto-configured):

- `SENDER_EMAIL`: Set in Lambda function (ebdesignwerks@gmail.com)
- `RECIPIENT_EMAIL`: Set in Lambda function (ebdesignwerks@gmail.com)
- `STORAGE_QUOTEREQUESTFILES_BUCKETNAME`: Auto-generated S3 bucket name

## File Upload Limits

- Maximum 5 files per quote request
- Supported formats: Images, PDF, STL, STEP, IGES, OBJ, 3MF
- Files are stored in S3 with signed URLs valid for 7 days

## Monitoring and Logs

### CloudWatch Logs

Lambda function logs are available in CloudWatch:
- Log group: `/aws/lambda/send-quote-request-*`

### S3 Bucket

Files are stored in: `quote-uploads/` prefix with timestamp

### API Gateway

Monitor API usage in API Gateway console:
- Requests per second
- Error rates
- Latency

## Cost Considerations

Estimated monthly costs for moderate usage:
- **S3 Storage**: ~$0.02/GB stored
- **Lambda**: Free tier covers most usage
- **SES**: $0.10 per 1,000 emails
- **API Gateway**: $3.50 per million requests
- **Amplify Hosting**: ~$0.15/GB served

## Troubleshooting

### Email Not Sending

1. Check SES is verified for your domain/email
2. Ensure you're out of SES sandbox for production
3. Check Lambda logs in CloudWatch

### File Upload Fails

1. Check S3 bucket permissions
2. Verify CORS settings on S3 bucket
3. Check file size limits

### API Errors

1. Check API Gateway logs
2. Verify Lambda function has correct IAM permissions
3. Check CORS headers in Lambda response

## Security Best Practices

1. **Email Validation**: The Lambda function validates all inputs
2. **File Type Restrictions**: Only allowed file types can be uploaded
3. **Signed URLs**: S3 files are accessed via time-limited signed URLs
4. **CORS**: Configured to allow only your domain in production
5. **Rate Limiting**: Consider adding API throttling for production

## Future Enhancements

1. **DynamoDB**: Store quote requests for tracking
2. **Step Functions**: Complex workflow for quote processing
3. **SNS**: Real-time notifications
4. **CloudFront**: CDN for faster file delivery
5. **WAF**: Web Application Firewall for additional security

## Support

For AWS-specific issues:
- Check CloudWatch logs
- Review IAM permissions
- Verify service limits

For application issues:
- Check browser console for errors
- Verify environment variables
- Test with Amplify sandbox first
