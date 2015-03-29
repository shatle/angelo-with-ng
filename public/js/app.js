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
            template: '<a ui-sref="app.contacts">contacts</a><div ui-view></div>'
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
      return window.__aws = new AWS('127.0.0.1:4567/ws');
    }
  ]);
  console.log('app,,,,');
  return app;
});
