$:.unshift '', __FILE__

require 'angelo'

class App < Angelo::Base

  def to_ws(data)
    websockets.each {|ws| ws.write data.to_json }
  end

  get '/' do 
    erb :app
  end

  post '/emit' do 
    to_ws params
  end
  
  websocket '/ws' do |s|
    websockets << s

    p "===="
    p params[:foo], s

    # don't do this!
    #
    # while msg = s.read
    #
    # instead, do this!
    #
    s.on_message do |msg|
      p "===msg====", msg, s
      s.write msg.to_json
      # 5.times { s.write ({foo: "bar", baz: 123, bat: false}.to_json) }
      # s.write params[:foo].to_json
    end
  end
end

App.run!