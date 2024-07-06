export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development", // or production
  PORT: process.env.PORT ?? 8080,
  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET:process.env.JWT_SECRET ?? ""
};
