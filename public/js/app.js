define(['angular', 'angular-couch-potato', 'angular-ui-router', 'aws', 'angular-ui-semantic'], function(angular, couchPotato, router, AWS) {
  var app;
  app = angular.module('app', ['scs.couch-potato', 'ui.router', 'angularify.semantic']);
  couchPotato.configureApp(app);
  app.config([
    '$stateProvider', '$urlRouterProvider', '$couchPotatoProvider', function($stateProvider, $urlRouterProvider, $couchPotatoProvider) {
      $urlRouterProvider.when('', '/');
      return $stateProvider.state('app', {
        url: '/',
        resolve: {
          dummy: $couchPotatoProvider.resolveDependencies(['authCtrl'])
        },
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
      __aws.req('new', {
        foo: 'bar'
      });
      $rootScope.openSignupModal = function() {
        $rootScope.signupModal = true;
        return console.log('openSignupModal', $rootScope.signupModal);
      };
      $rootScope.closeSignupModal = function() {
        $rootScope.signupModal = false;
        return console.log('closeSignupModal', $rootScope.signupModal);
      };
      $rootScope.openLoginModal = function() {
        $rootScope.loginModal = true;
        return console.log('openLoginModal', $rootScope.loginModal);
      };
      return $rootScope.closeLoginModal = function() {
        $rootScope.loginModal = false;
        return console.log('closeLoginModal', $rootScope.loginModal);
      };
    }
  ]);
  console.log('app,,,,');
  return app;
});
