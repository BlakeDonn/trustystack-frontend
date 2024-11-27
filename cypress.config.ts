import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    video: false, // Disable video recording to save time
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    pageLoadTimeout: 60000, // Adjust as needed
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Implement node event listeners here if needed
    },
    defaultCommandTimeout: 10000,
  },
  env: {
    NEXTAUTH_URL: "http://localhost:3000",
  },
});
