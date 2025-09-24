import { defineFunction } from '@aws-amplify/backend';

export const quoteApi = defineFunction({
  name: 'quote-api',
  runtime: 20,
  timeoutSeconds: 30,
  entry: '../send-quote-request/handler.ts'
});
