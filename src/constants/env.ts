export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development", // or production
  PORT: process.env.PORT ?? 5000,
  DATABASE_URL: process.env.DATABASE_URL,
};
