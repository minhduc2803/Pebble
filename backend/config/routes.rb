Rails.application.routes.draw do
  post '/user_token' =>  'user_token#create'
  get '/users/user_info' => 'users#user_info'
  post   '/users'   => 'users#create'
  get '/videos' => 'videos#index'
  post '/videos' => 'videos#create'

  mount ActionCable.server => '/cable'
end
