((factory) => {
  if (typeof require === 'function' && typeof exports === 'object') {
    // Define as CommonJS export:
    module.exports = factory();
  }
  else if (typeof define === 'function' && define.amd) {
    // Define as AMD:
    define([], factory);
  }
  else {
    // Browser:
    window.PACKAGE_NAME = factory();
  }
})(() => {
  // Package code
});
