define [], ()->
  class AWS 
    constructor: (@host)->
      @ws = new WebSocket('ws://'+@host)
      @response = {}
      @__message()

    # private
    # 
    __waitCon: (cb, interval)->
      if @ws.readyState == 1
        cb && cb()
      else
        setTimeout ()=>
          @__waitCon(cb, interval)
        , interval

    __open: (cb)->
      @ws.onopen = (d)->
        cb(d) if cb?()

    __message: ()->
      @ws.onmessage = (d)=>
        console.log "onmessage,,,,", d
         
        d = JSON.parse(d.data)
        @response[d.req_name](d.data) if d.req_name && @response[d.req_name]

    __send: (name, data)->

      @__waitCon ()=>
        data_string = JSON.stringify
          req_name: @__replaceIllegalWords(name), 
          data: data
        @ws.send(data_string) if name && data
      , 1000

    __replaceIllegalWords: (name)->
      name.replace(/\W/g, '_')

    __registerResponse: (name, cb)->
      return console.log('Error args,...') if !name || !cb
      reg_name = @__replaceIllegalWords(name)
      if !@response[reg_name]
        @response[reg_name] = cb 
      else
        console.log "U have already set name: "+reg_name+" from "+name+"! "

    # public

    res: (name, cb)->
      console.log "response,,,,,", @response
      @__registerResponse(name, cb) if name && cb

    req: (name, query)->
      @__send(name, query) if name && query
