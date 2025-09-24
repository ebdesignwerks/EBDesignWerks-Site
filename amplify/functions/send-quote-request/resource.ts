import { defineFunction } from '@aws-amplify/backend';

export const sendQuoteRequest = defineFunction({
  name: 'send-quote-request',
  runtime: 20,
  environment: {
    SENDER_EMAIL: 'ebdesignwerks@gmail.com',
    RECIPIENT_EMAIL: 'ebdesignwerks@gmail.com'
  }
});
