export default {
  // 'presets' are collections of Babel plugins.
  // '@babel/preset-env' automatically determines the Babel plugins you need
  // based on the JavaScript features you're using and the environments you target.
  presets: [
    ['@babel/preset-env', {
      // 'targets' can be used to specify browser/Node.js versions.
      // For Node.js backend testing, 'node: current' is often sufficient
      // to ensure modern Node.js features are supported during tests.
      targets: {
        node: 'current',
      },
      // 'modules: false' is important for Jest if you're using native ES Modules
      // or if Jest's own module system handles it.
      // However, for Jest with babel-jest, it's often best to let Babel transform
      // ESM syntax to CommonJS for Jest's internal module loader.
      // So, we'll keep 'modules' as default or set to 'auto'.
    }],
  ],
};
