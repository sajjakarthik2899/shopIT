// jest.setup.js
import jest from 'jest'; // This import is actually not needed for the mock itself, but good practice if using other Jest utilities.

// Mock for 'catchAsyncError' utility
// This mock makes 'catchAsyncError' a "passthrough" function.
// It receives the 'controllerFunction' and simply returns it,
// allowing your unit tests to directly test the core logic of the controller.
jest.mock('../../utils/catchAsyncError.js', () => {
  return {
    __esModule: true, // This flag indicates it's an ES Module mock
    default: (controllerFunction) => controllerFunction,
  };
});
