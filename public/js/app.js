define(['angular', 'angular-couch-potato', 'angular-ui-router', 'aws'], function(angular, couchPotato, router, AWS) {
  var app;
  app = angular.module('app', ['scs.couch-potato', 'ui.router']);
  couchPotato.configureApp(app);
  app.config([
    '$stateProvider', '$urlRouterProvider', '$couchPotatoProvider', function($stateProvider, $urlRouterProvider, $couchPotatoProvider) {
      $urlRouterProvider.when('', '/');
      return $stateProvider.state('app', {
        url: '/',
        views: {
          '': {
            templateUrl: 'index.html'
          }
        }
      }).state('app.contacts', {
        url: 'contacts',
        templateUrl: 'templates/contacts.html'
      });
    }
  ]);
  app.run([
    '$couchPotato', '$state', '$stateParams', '$rootScope', function($couchPotato, $state, $stateParams, $rootScope) {
      app.lazy = $couchPotato;
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      window.__aws = new AWS('127.0.0.1:4567/ws');
      console.log("__aws, new,,,,,");
      __aws.res('new', function(d) {
        return console.log('res,,,,,', d);
      });
      return __aws.req('new', {
        foo: 'bar'
      });
    }
  ]);
  console.log('app,,,,');
  return app;
});
