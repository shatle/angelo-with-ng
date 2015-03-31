APP_ENV ||= { mode: :test }

$:.unshift '', __FILE__
require 'app'
require "minitest/autorun"
Dir[File.dirname(__FILE__) + '/test/*.rb'].each {|file| require file }