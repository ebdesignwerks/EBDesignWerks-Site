# AWS SES (Simple Email Service) Setup Guide

This guide explains how to set up AWS SES for the email functionality to work properly.

## Why Emails Aren't Being Sent

The Lambda function is configured correctly, but AWS SES requires email addresses to be verified before they can send emails. Without this verification, the Lambda function will appear to succeed but no emails will actually be sent.

## Steps to Enable Email Sending

### 1. Verify Your Email Address in AWS SES

1. Log into your AWS Console
2. Navigate to Amazon SES (Simple Email Service)
3. In the left sidebar, click on "Verified identities"
4. Click "Create identity"
5. Select "Email address"
6. Enter `ebdesignwerks@gmail.com` (your sender email)
7. Click "Create identity"
8. Check your email and click the verification link from AWS
9. Repeat this process for any other email addresses you want to send TO during testing

### 2. Move Out of SES Sandbox (For Production)

By default, AWS SES is in "sandbox mode" which only allows sending emails to verified addresses.

To send emails to any address:
1. In AWS SES console, click "Account dashboard"
2. Look for "Sending statistics" section
3. Click "Request production access"
4. Fill out the form explaining your use case (quote request forms)
5. Wait for AWS approval (usually 24 hours)

### 3. Deploy Your Updated Backend

After making the code changes, deploy the updated backend:

```bash
cd C:\Users\ericb\Desktop\Buisness\Buisness-IT\Site\EBDesignWerks-Site
npx ampx deploy
```

### 4. Verify the Configuration

After deployment, check that the Lambda function URL is added to your `amplify_outputs.json`:

```json
{
  "custom": {
    "sendQuoteRequestUrl": "https://[your-function-url].lambda-url.[region].on.aws/"
  }
}
```

## Troubleshooting

### Check Lambda Logs
1. Go to AWS CloudWatch
2. Find logs for `/aws/lambda/send-quote-request`
3. Look for any error messages

### Common Issues
- **"Email address not verified"**: The sender email needs to be verified in SES
- **"Message rejected"**: You're still in sandbox mode and trying to send to unverified email
- **No logs at all**: The Lambda function isn't being called - check the function URL

### Test the Lambda Function Directly
You can test the Lambda function in the AWS Console:
1. Go to Lambda service
2. Find your `send-quote-request` function
3. Click "Test"
4. Create a test event with this JSON:
```json
{
  "httpMethod": "POST",
  "body": "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"service\":\"Test Service\",\"projectDescription\":\"This is a test\"}"
}
```

## Environment Variables

The Lambda function uses these environment variables (already configured):
- `SENDER_EMAIL`: ebdesignwerks@gmail.com
- `RECIPIENT_EMAIL`: ebdesignwerks@gmail.com

If you need to change these, update them in `amplify/functions/send-quote-request/resource.ts`.

## Local Development

For local development, the site uses EmailJS instead of AWS SES. Make sure you have these environment variables set in your `.env` file:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
