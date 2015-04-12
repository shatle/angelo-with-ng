define(['app'], function(app) {
  return app.registerDirective('autoHeight', [
    '$timeout', function($timeout) {
      var drt;
      return drt = {
        link: function(scope, element, attrs) {
          var curEleHeight, ele, offset, ref;
          console.log("autoHeight,,,directive");
          ref = attrs.autoHeight.split(','), ele = ref[0], offset = ref[1];
          curEleHeight = $(ele).height() + parseInt(offset, 10);
          if (curEleHeight < 40) {
            curEleHeight = 40;
          }
          return element.css({
            'height': curEleHeight + 'px'
          });
        }
      };
    }
  ]);
});
