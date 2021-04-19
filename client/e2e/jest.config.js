module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:8080"
  },
  testMatch: ["**/specs/*.js"],
  transform: {
    "\\.js$": "react-scripts/config/jest/babelTransform"
  },
  verbose: true,
  setupFilesAfterEnv: ['./jest.setup.js']
};
