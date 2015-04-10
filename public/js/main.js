requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'jquery-2.1.3.min',
    'semantic': 'semantic.min',
    'angular': 'angular.min',
    'angular-ui-router': 'angular-ui-router.min',
    'angular-couch-potato': 'angular-couch-potato',
    'angular-ui-semantic': 'angular-semantic-ui.min',
    'nanoscroller': 'jquery.nanoscroller.min'
  },
  shim: {
    'semantic': {
      deps: ['jquery']
    },
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'angular-ui-semantic': {
      deps: ['angular', 'jquery']
    },
    'nanoscroller': {
      deps: ['jquery']
    }
  }
});

requirejs(['app', 'angular', 'semantic'], function(app, angular) {
  console.log("requirejs,,,,,");
  return angular.element(document).ready(function() {
    return angular.bootstrap(document, [app['name']]);
  });
});
