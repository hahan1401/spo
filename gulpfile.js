'use strict';

const build = require('@microsoft/sp-build-web');

// Suppress warnings for CSS class names
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// Override serve task to use 'serve-deprecated'
var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// Force SPFx to use PostCSS 8
build.configureWebpack.mergeConfig({
  additionalConfiguration: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      postcss: require.resolve('postcss'), // Use the installed PostCSS 8 version
    };
    return config;
  },
});

// Initialize build process
build.initialize(require('gulp'));
