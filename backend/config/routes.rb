Rails.application.routes.draw do
  ExceptionHunter.routes(self)
  post :user_token, controller: :user_token, action: :create
end
