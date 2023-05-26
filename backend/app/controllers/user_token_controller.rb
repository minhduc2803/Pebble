class UserTokenController < Knock::AuthTokenController
  skip_before_action :verify_authenticity_token, raise: false

  def create
    render json: {
      id: entity.id,
      token: auth_token.token,
      full_name: entity.full_name,
      email: entity.email,
    }
  end
end