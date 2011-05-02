require "rubygems"
require 'sinatra'
require "cgi"

# To make post request
require "json"
require "ruby-debug"


set :public, File.dirname(__FILE__) + '/fb'


get '/' do
  redirect to("index.html")
end



# Proxy for cross domain HTTP POST
# Should return JSON - as response can be consumed by an ajax call
# Required params are access_token (encoded), post_url (encoded), query (encoded)
# query can contain as many k1=v1&k2=v2 pairs
get '/post' do
  post_command = "curl -d \"#{CGI.unescape(params["access_token"])}&"
  post_command += "#{CGI.unescape(params["query"])}" if params["query"] # not passed in like, but is passed in comment...
  post_command += "\""
  post_command += " '#{CGI.unescape(params["post_url"])}'"
  puts post_command  
  return IO.popen(post_command).read
end
