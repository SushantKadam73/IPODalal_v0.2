import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };

export const DATABASE_ID = 'ipo-dalal-db';
export const COLLECTIONS = {
  IPOS: 'ipos',
  SUBSCRIPTION_DATA: 'subscription-data',
  GMP_DATA: 'gmp-data',
  USER_CALCULATIONS: 'user-calculations',
  ADMIN_LOGS: 'admin-logs',
} as const;
