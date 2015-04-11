define ['angular',
  'angular-couch-potato', 'angular-ui-router', 'aws', 'angular-ui-semantic'
  ], (angular, couchPotato,router, AWS)->

    app = angular.module('app', ['scs.couch-potato', 'ui.router', 'angularify.semantic'])
    couchPotato.configureApp(app);

    # Config router
    app.config ['$stateProvider','$urlRouterProvider', '$couchPotatoProvider', 
      ($stateProvider,$urlRouterProvider,$couchPotatoProvider)->
        $urlRouterProvider.when('', '/')

        $stateProvider
          .state('app', {
              url: '/',
              # template: '<a ui-sref="app.contacts">contacts</a><div ui-view></div>',
              resolve: {
                dummy: $couchPotatoProvider.resolveDependencies(['authCtrl'])
              },
              views: {
                '': { templateUrl: 'index.html' },
                # 'mainnav': {
                #   templateUrl: 'templates/mainnav.html',
                #   # controller: 'topheadCtrl',
                #   resolve: {
                #     dummy: $couchPotatoProvider.resolveDependencies(['mainnavDirective'])
                #   }
                # },
                # 'topheader': { 
                #   templateUrl: 'templates/topheader.html',
                #   controller: 'topheadCtrl',
                #   resolve: {
                #     dummy: $couchPotatoProvider.resolveDependencies(['topheadCtrl'])
                #   }
                # }
              },
              
            })
          .state('app.contacts', {
              url: 'contacts',
              templateUrl: 'templates/contacts.html',
              # controller: 'contactsCtrl',
              # resolve: {
              #   dummy: $couchPotatoProvider.resolveDependencies(['contactsCtrl'])
              # }
            })
    ]

    # init run
    app.run ['$couchPotato', '$state', '$stateParams', '$rootScope', 
      ($couchPotato, $state, $stateParams, $rootScope)-> 
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        # window.__aws = new AWS('127.0.0.1:4567/ws')
        # console.log  "__aws, new,,,,,"
        # __aws.res 'new', (d)->
        #   console.log 'res,,,,,', d 
        # __aws.req 'new', {foo: 'bar'}


        $rootScope.openSignupModal = ()->
          $rootScope.signupModal = true
          console.log 'openSignupModal', $rootScope.signupModal

        $rootScope.closeSignupModal = ()->
          $rootScope.signupModal = false
          console.log 'closeSignupModal', $rootScope.signupModal

        $rootScope.openLoginModal = ()->
          $rootScope.loginModal = true
          console.log 'openLoginModal', $rootScope.loginModal

        $rootScope.closeLoginModal = ()->
          $rootScope.loginModal = false
          console.log 'closeLoginModal', $rootScope.loginModal
    ]

    console.log 'app,,,,'
    return app
