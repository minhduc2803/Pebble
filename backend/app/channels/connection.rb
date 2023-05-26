module ApplicationCable
  def connect
    self.current_user = find_verified_user
  end

  private

  def find_verified_user
    token = request.headers['Authorization']&.split(' ')&.last,
    payload = JWT.decode(token, Rails.application.credentials.secret_key_base).first
    user_id = payload['sub']
    User.find_by(id: user_id)
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    reject_unauthorized_connection
  end
end
