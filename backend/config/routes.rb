Rails.application.routes.draw do
  ExceptionHunter.routes(self)
  post :user_token, controller: :user_token, action: :create
  post   '/users/create'   => 'users#create'
  get 'videos' => 'videos#index'
  post 'videos' => 'videos#create'
end
