export default {
  // Tells Jest to use the 'node' environment, which is suitable for backend testing.
  testEnvironment: 'node',

  // Automatically clears mock calls, instances, contexts and results before every test.
  clearMocks: true,

  // This is crucial for telling Jest how to transform your JavaScript files.
  // We're telling it to use 'babel-jest' for any file ending in '.js'.
  // Babel will then use your babel.config.js to perform the actual transformation.
  transform: {
    '^.+\\.js$': 'babel-jest', // Use babel-jest for all .js files
  },

  // Tells Jest to ignore transforming files within 'node_modules'.
  // This is a standard practice as node_modules should already be in a consumable format.
  // This pattern is explicitly defined and shouldn't cause regex errors.
  transformIgnorePatterns: ['/node_modules/'],

  // Points to a setup file that runs once before all tests.
  // This is where we set up global mocks like 'catchAsyncError'.
  setupFilesAfterEnv: ['./jest.setup.js'], // Ensure this path is correct
};