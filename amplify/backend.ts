import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { sendQuoteRequest } from './functions/send-quote-request/resource';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { RestApi, LambdaIntegration, Cors } from 'aws-cdk-lib/aws-apigateway';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  sendQuoteRequest
});

// Grant the Lambda function permissions to send emails via SES
backend.sendQuoteRequest.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['ses:SendEmail', 'ses:SendRawEmail'],
    resources: ['*']
  })
);

// Grant the Lambda function permissions to access S3
backend.sendQuoteRequest.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ['s3:GetObject'],
    resources: [`${backend.storage.resources.bucket.bucketArn}/*`]
  })
);

// Add environment variable for the S3 bucket name
backend.sendQuoteRequest.resources.lambda.addEnvironment(
  'STORAGE_QUOTEREQUESTFILES_BUCKETNAME',
  backend.storage.resources.bucket.bucketName
);

// Create REST API for quote requests
const api = new RestApi(backend.sendQuoteRequest.resources.lambda.stack, 'QuoteRequestApi', {
  restApiName: 'EB Design Werks Quote API',
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key', 'X-Amz-Security-Token']
  }
});

// Create Lambda integration
const quoteIntegration = new LambdaIntegration(backend.sendQuoteRequest.resources.lambda);

// Add the /quote-request endpoint
const quoteResource = api.root.addResource('quote-request');
quoteResource.addMethod('POST', quoteIntegration);
quoteResource.addMethod('OPTIONS', quoteIntegration);

// Output the API endpoint
backend.addOutput({
  custom: {
    QuoteRequestApiEndpoint: api.url
  }
});