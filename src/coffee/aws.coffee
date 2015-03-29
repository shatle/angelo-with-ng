define [], ()->
  class AWS 
    constructor: (@host)->
      @ws = new WebSocket('ws://'+@host)
      @response = {}
      @__message()

    # private

    __open: (cb)->
      @ws.onopen = (d)->
        cb(d) if cb?()

    __message: ()->
      @ws.onmessage = (d)->
        console.log "onmessage,,,,", d, JSON.parse(d)
        d = JSON.parse(d)
        @response[d.req_name](d.data) if d.req_name && @response[d.req_name]

    __send: (name, data)->
      data_string = JSON.stringify
        req_name: @__replaceIllegalWords(name), 
        data: data
      @ws.send(data_string) if name && data

    __replaceIllegalWords: (name)->
      name.replace(/\W/g, '_')

    __registerResponse: (name, cb)->
      return console.error('Error args,...') if !name || !cb?()
      reg_name = @__replaceIllegalWords(name)
      if !@response[reg_name]
        @response[reg_name] = cb 
      else
        console.error "U have already set name: "+reg_name+" from "+name+"! "

    # public

    res: (name, cb)->
      __registerResponse(name, cb) if name && cb

    req: (name, query)->
      __send(name, query) if name && query
