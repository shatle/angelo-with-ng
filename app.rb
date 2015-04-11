$:.unshift '', __FILE__

APP_ENV ||= { mode: :development }

require 'angelo'
require 'mongoid'
# require 'protected_attributes'

# load mongodb with mongoid
@con = Mongoid.load!("mongoid.yml", APP_ENV&&APP_ENV[:mode].nil? ? :development : APP_ENV[:mode] )

# require model
Dir[File.dirname(__FILE__) + '/model/*.rb'].each {|file| require file }

class App < Angelo::Base

  def to_ws(data)
    websockets.each {|ws| ws.write data.to_json }
  end

  get '/' do 
    erb :app
  end
  
  websocket '/ws' do |s|
    websockets << s

    # don't do this!
    #
    # while msg = s.read
    #
    # instead, do this!
    #
    s.on_message do |msg|
      p "===msg====", msg, JSON.parse(msg) #, s
      # s.write ({foo: "bar"}).to_json
      s.write msg
      # 5.times { s.write ({foo: "bar", baz: 123, bat: false}.to_json) }
      # s.write params[:foo].to_json
    end
  end
end

App.run! unless APP_ENV&&APP_ENV[:mode]==:test
