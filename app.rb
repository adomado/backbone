require "rubygems"
require 'sinatra'

# To make post request
require "json"
require "ruby-debug"


set :public, File.dirname(__FILE__) + '/fb'


get '/' do
  redirect to("index.html")
end



# Proxy for cross domain HTTP POST
# Should return JSON - as response can be consumed by an ajax call
# Required params are post_url (encoded), post_data (encoded)
get '/post' do
  post_command = "curl -F '#{CGI.unescape(params[:post_data])}' '#{CGI.unescape(params[:post_url])}'"
  return IO.popen(post_command).read
end
