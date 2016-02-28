describe('marionette-routes-helper', function() {
  this.timeout(5000);
  this.slow(3000);

  beforeEach(function() {
    var Controller = Marionette.Object.extend({
      method: function() {},
      methodWithId: function() {}
    });

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        "some/route": "method",
        "some/route/:id": "methodWithId"
      },

      routes: {
        "other/route": "otherMethod",
        "other/route/:id": "otherMethodWithId"
      },

      controller: new Controller()
    });

    if (!MarionetteRoutesHelper.initialized()) {
      MarionetteRoutesHelper.initialize({ root: '' });
    }

    MarionetteRoutesHelper.bind('router', new Router());
  });

  describe('Marionette routes helper', function() {
    it('helper has appRoutes method "routerMethodPath"', function() {
      expect(MarionetteRoutesHelper).to.have.property('routerMethodPath');
    });

    it('helper has appRoutes method "routerMethodWithIdPath"', function() {
      expect(MarionetteRoutesHelper).to.have.property('routerMethodWithIdPath');
    });

    it('helper has routes method "routerOtherMethodPath"', function() {
      expect(MarionetteRoutesHelper).to.have.property('routerOtherMethodPath');
    });

    it('helper has routes method "routerOtherMethodWithIdPath"', function() {
      expect(MarionetteRoutesHelper).to.have.property('routerOtherMethodWithIdPath');
    });

    it('method "routerMethodPath" returns "some/route"', function() {
      expect(MarionetteRoutesHelper.routerMethodPath()).to.equal('some/route');
    });

    it('method "routerMethodWithIdPath" returns "some/route/7"', function() {
      expect(MarionetteRoutesHelper.routerMethodWithIdPath(7)).to.equal('some/route/7');
    });

    it('method "routerOtherMethodPath" returns "other/route"', function() {
      expect(MarionetteRoutesHelper.routerOtherMethodPath()).to.equal('other/route');
    });

    it('method "routerOtherMethodWithIdPath" returns "other/route/12"', function() {
      expect(MarionetteRoutesHelper.routerOtherMethodWithIdPath(12)).to.equal('other/route/12');
    });
  });
});
