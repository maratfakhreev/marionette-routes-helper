## Backbone.Marionette routes helper

Adds helper methods for Backbone.Marionette routes

[![Build Status](https://travis-ci.org/maratfakhreev/marionette-routes-helper.svg?branch=master)](https://travis-ci.org/maratfakhreev/marionette-routes-helper)

Backbone.Marionette routes helper is the simple plugin which provides you methods with routes names for your application.

### How to install:

```bash
npm install marionette-routes-helper
```

**Browser:**
```javascript
<script>...</script>
<script src="backbone.marionette.js" type="text/javascript"></script>
<script src="marionette-routes-helper.js" type="text/javascript"></script>
```

**Common JS:**
```javascript
var MarionetteRoutesHelper = require('marionette-routes-helper');
```

### How to use:

First you should initialize routes helper and pass to it the application root path.
```javascript
MarionetteRoutesHelper.initialize({ root: '/' });
```

Next you should bind routes helper to your router. For example:
```javascript
var Controller = Marionette.Object.extend({
  method: function() { ... }
});

var Router = Marionette.AppRouter.extend({
  appRoutes: {
    "some/route": "method"
  },

  routes: {
    "other/route/:id": "otherMethod"
  },

  controller: new Controller()

  otherMethod: function() { ... }
});

MarionetteRoutesHelper.bind('myrouter', new Router());
```

Now routes methods are available for you. They are based on the following pattern **routerName + RouterMethodName + "Path"**

```javascript
MarionetteRoutesHelper.myrouterMethodPath() // returns "some/route"
MarionetteRoutesHelper.myrouterOtherMethodPath(12) // returns "other/route/12"
```

### Options
```javascript
{
  root: '/' // application root path
}
```

### Methods

#### initialize

**Signature:** `.initialize(options)`

`initialize` sets base options

#### initialized

**Signature:** `.initialized()`

`initialized` returns boolean which define routes helper state. It is sometimes useful to check whether your routes helper is already initialized.

```javascript
if (!MarionetteRoutesHelper.initialized()) {
  MarionetteRoutesHelper.initialize({ root: '' });
}
```

#### bind

**Signature:** `.bind(routerName, routerInstance)`

`bind` binds routes helper with router instance

#### rootPath

**Signature:** `.rootPath()`

`rootPath` returns the root path value which passed to it in initialize method

### Thanks to:

* The Marionette team for [backbone.marionette.js](http://marionettejs.com)
* [Anton Gudkov](https://github.com/antongudkov) for the idea and first draft
