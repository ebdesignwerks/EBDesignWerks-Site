import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'quoteRequestFiles',
  access: (allow) => ({
    'quote-uploads/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write', 'delete'])
    ],
  })
});
