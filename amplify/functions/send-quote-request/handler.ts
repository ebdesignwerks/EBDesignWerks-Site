/// <reference types="node" />
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { APIGatewayProxyHandler } from 'aws-lambda';

const sesClient = new SESClient({ region: process.env.AWS_REGION });
const s3Client = new S3Client({ region: process.env.AWS_REGION });

interface QuoteRequestBody {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  projectDescription: string;
  timeline?: string;
  budget?: string;
  attachmentKeys?: string[];
}

export const handler: APIGatewayProxyHandler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const body: QuoteRequestBody = JSON.parse(event.body || '{}');
    
    // Generate signed URLs for attachments
    let attachmentLinks = '';
    if (body.attachmentKeys && body.attachmentKeys.length > 0) {
      attachmentLinks = '\n\nAttached Files:\n';
      for (const key of body.attachmentKeys) {
        const command = new GetObjectCommand({
          // Amplify Gen2 bucket naming pattern: amplify-{appId}-{branchName}-{stackName}-{resourceName}
          // We'll construct this from environment variables
          Bucket: process.env.STORAGE_QUOTEREQUESTFILES_BUCKETNAME || 
                  `amplify-${process.env.AWS_BRANCH || 'main'}-quoterequestfiles`,
          Key: key
        });
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 604800 }); // 7 days
        attachmentLinks += `${key.split('/').pop()}: ${signedUrl}\n`;
      }
    }

    const emailParams = {
      Source: process.env.SENDER_EMAIL!,
      Destination: {
        ToAddresses: [process.env.RECIPIENT_EMAIL!]
      },
      Message: {
        Subject: {
          Data: `New Quote Request from ${body.name} - ${body.service}`
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif;">
                  <h2>New Quote Request</h2>
                  <p><strong>Name:</strong> ${body.name}</p>
                  <p><strong>Email:</strong> ${body.email}</p>
                  <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
                  <p><strong>Company:</strong> ${body.company || 'Not provided'}</p>
                  <p><strong>Service:</strong> ${body.service}</p>
                  <p><strong>Timeline:</strong> ${body.timeline || 'Not specified'}</p>
                  <p><strong>Budget:</strong> ${body.budget || 'Not specified'}</p>
                  <h3>Project Description:</h3>
                  <p>${body.projectDescription.replace(/\n/g, '<br>')}</p>
                  ${attachmentLinks ? `<h3>Attachments:</h3><pre>${attachmentLinks}</pre>` : ''}
                </body>
              </html>
            `
          },
          Text: {
            Data: `
New Quote Request from ${body.name}

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phone || 'Not provided'}
Company: ${body.company || 'Not provided'}
Service: ${body.service}
Timeline: ${body.timeline || 'Not specified'}
Budget: ${body.budget || 'Not specified'}

Project Description:
${body.projectDescription}
${attachmentLinks}
            `
          }
        }
      }
    };

    await sesClient.send(new SendEmailCommand(emailParams));

    // Send confirmation email to customer
    const confirmationParams = {
      Source: process.env.SENDER_EMAIL!,
      Destination: {
        ToAddresses: [body.email]
      },
      Message: {
        Subject: {
          Data: 'Quote Request Received - EB Design Werks'
        },
        Body: {
          Html: {
            Data: `
              <html>
                <body style="font-family: Arial, sans-serif;">
                  <h2>Thank you for your quote request!</h2>
                  <p>Hi ${body.name},</p>
                  <p>We've received your quote request for ${body.service}. Our team will review your project details and get back to you within 24 hours.</p>
                  <h3>Your Request Summary:</h3>
                  <p><strong>Service:</strong> ${body.service}</p>
                  <p><strong>Timeline:</strong> ${body.timeline || 'Not specified'}</p>
                  <p><strong>Budget:</strong> ${body.budget || 'Not specified'}</p>
                  <p>If you have any urgent questions, please feel free to email us directly at ebdesignwerks@gmail.com</p>
                  <p>Best regards,<br>EB Design Werks Team</p>
                </body>
              </html>
            `
          }
        }
      }
    };

    await sesClient.send(new SendEmailCommand(confirmationParams));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        message: 'Quote request sent successfully',
        requestId: event.requestContext.requestId 
      })
    };
  } catch (error) {
    console.error('Error processing quote request:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Failed to process quote request',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
