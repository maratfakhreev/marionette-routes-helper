((factory) => {
  if (typeof require === 'function' && typeof exports === 'object') {
    // Define as CommonJS export:
    module.exports = factory(require('backbone.marionette'));
  }
  else if (typeof define === 'function' && define.amd) {
    // Define as AMD:
    define(['backbone.marionette'], factory);
  }
  else {
    // Browser:
    window.MarionetteRoutesHelper = factory(window.Marionette);
  }
})((Marionette) => {
  return class RoutesHelper {
    static initialize(options) {
      this.options = options;
    }

    static initialized() {
      return !!this.options;
    }

    static bind(routerName, router) {
      if (!this.initialized()) {
        throw new Error('You should define options via initialize method');
      }

      if (!routerName || typeof routerName !== 'string') {
        throw new Error('First parameter should be a string');
      }

      if (!router || !(router instanceof Marionette.AppRouter)) {
        throw new Error('Second parameter should be an instance of Marionette.AppRouter');
      }

      this.addRoutes(routerName, router.appRoutes);
      this.addRoutes(routerName, router.routes);
    }

    static addRoutes(routerName, routes) {
      for (const pattern in routes) {
        if (routes.hasOwnProperty(pattern)) {
          const routeName = routes[pattern];

          this.addRoute(routerName, routeName, pattern);
        }
      }
    }

    static rootPath() {
      return this.options.root;
    }

    static prependRoot(path) {
      const rootPath = this.rootPath();

      return (path.indexOf(rootPath)) ? `${rootPath}${path}` : path;
    }

    static addRoute(routerName, routeName, pattern) {
      const keys = pattern.match(/\:\w+/g);
      const routerPart = routerName;
      const routePart = routeName.charAt(0).toUpperCase() + routeName.substr(1);
      const methodName = `${routerPart}${routePart}Path`;

      this[methodName] = (...params) => {
        let path = pattern;

        if (!keys) return this.prependRoot(path);

        if (keys.length !== params.length) {
          throw new Error(`incorrect params count (${params.length} for ${keys.length})`);
        }

        params.forEach((param) => {
          path = path.replace(/\:\w+/, param);
        });

        return this.prependRoot(path);
      };

      return this[methodName];
    }
  };
});
