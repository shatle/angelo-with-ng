define(['app'], function(app) {
  return app.registerController('authCtrl', [
    '$scope', '$state', function($scope, $state) {
      return console.log('authCtrl,,,,,');
    }
  ]);
});
