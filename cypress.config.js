const {defineConfig} = require("cypress");
const webpackConfig = require("./webpack/webpack.dev.config");

module.exports = defineConfig({
  nodeVersion: "system",
  fixturesFolder: "tests/fixtures",
  screenshotsFolder: "tests/screenshots",
  videosFolder: "tests/videos",
  defaultCommandTimeout: 1000,
  requestTimeout: 1000,

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./tests/plugins/index.js")(on, config);
    },
    baseUrl: "http://127.0.0.1:8081",
    specPattern: "tests/feature/**/*.spec.js",
    supportFile: "tests/feature/support/index.js",
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "webpack",
      webpackConfig
    },
    specPattern: "tests/components/**/*.spec.js",
    supportFile: "tests/components/support/index.js",
    indexHtmlFile: "tests/components/support/index.html",
  },
});
