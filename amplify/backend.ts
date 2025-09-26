import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { sendQuoteRequest } from './functions/send-quote-request/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  sendQuoteRequest
});

// Set the storage bucket name for the Lambda function
backend.sendQuoteRequest.addEnvironment(
  'STORAGE_QUOTEREQUESTFILES_BUCKETNAME',
  backend.storage.resources.bucket.bucketName
);

// Grant the Lambda function permission to read from the S3 bucket
backend.storage.resources.bucket.grantRead(backend.sendQuoteRequest.resources.lambda);

// Access the underlying CDK lambda function to add permissions and function URL
const lambdaFunction = backend.sendQuoteRequest.resources.lambda;
const stack = backend.sendQuoteRequest.resources.lambda.stack;

// Grant SES permissions using the role's add managed policy
lambdaFunction.role?.addManagedPolicy({
  managedPolicyArn: 'arn:aws:iam::aws:policy/AmazonSESFullAccess'
});

// For now, we'll use the existing amplify_outputs.json and update the client
// to call the Lambda function directly using the Amplify SDK

// Add the Lambda function name to outputs
backend.addOutput({
  custom: {
    sendQuoteRequestFunction: backend.sendQuoteRequest.resources.lambda.functionName
  }
});