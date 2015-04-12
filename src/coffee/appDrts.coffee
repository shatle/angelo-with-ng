define ['app'], (app)->
  app.registerDirective 'autoHeight', ['$timeout', ($timeout)->
    
    drt = 
      link: (scope, element, attrs)->
        console.log("autoHeight,,,directive")
        [ele, offset] = attrs.autoHeight.split(',')
        curEleHeight = $(ele).height()+parseInt(offset, 10)
        curEleHeight = 40 if  curEleHeight < 40 
        element.css({'height': curEleHeight+'px'})

  ]
