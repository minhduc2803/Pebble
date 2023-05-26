class UsersController < ApplicationController
  skip_before_action :authenticate_user,  only: [:create]
  before_action :authorize_user, only: [:create]
  
  def create
    user = User.new(user_params)
    if user.save
      auth_token = Knock::AuthToken.new(payload: { sub: user.id })
      render json: { 
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        token: auth_token.token,
       }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:full_name, :email, :password)
  end

  def authorize_user
    authorize User
  end
end