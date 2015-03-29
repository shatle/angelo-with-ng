requirejs.config({
  baseUrl: 'js',
  paths: {
    'angular': 'angular.min',
    'angular-ui-router': 'angular-ui-router.min',
    'angular-couch-potato': 'angular-couch-potato',
    'angular-ui-bootstrap': 'ui-bootstrap-tpls-0.12.1.min',
    'jquery': 'jquery-2.1.3.min',
    'nanoscroller': 'jquery.nanoscroller.min'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-ui-router': {
      deps: ['angular']
    },
    'angular-ui-bootstrap': {
      deps: ['angular']
    },
    'nanoscroller': {
      deps: ['jquery']
    }
  }
});

requirejs(['app', 'angular'], function(app, angular) {
  console.log("requirejs,,,,,");
  return angular.element(document).ready(function() {
    return angular.bootstrap(document, [app['name']]);
  });
});
