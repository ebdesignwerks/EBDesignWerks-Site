import { defineFunction, secret } from '@aws-amplify/backend';

export const sendQuoteRequest = defineFunction({
  name: 'send-quote-request',
  runtime: 20,
  timeoutSeconds: 30,
  environment: {
    SENDER_EMAIL: 'ebdesignwerks@gmail.com',
    RECIPIENT_EMAIL: 'ebdesignwerks@gmail.com',
    // The bucket name will be set by the backend configuration
    STORAGE_QUOTEREQUESTFILES_BUCKETNAME: 'placeholder-will-be-replaced'
  }
});
