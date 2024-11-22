import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    defaultCommandTimeout: 10000,
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
  },
});
