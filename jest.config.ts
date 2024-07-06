export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.spec.ts", "tests"],
  setupFilesAfterEnv: ['./src/config/jest-db-setup.ts'],
  verbose: true,
  forceExit: false,
};
