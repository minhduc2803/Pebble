class RegistrationsController
  protect_from_forgery with: :exception, unless: :json_request?
  include Api::Concerns::ActAsApiRequest

  # POST /auth/sign_in
  def create
    super
  end

  # DELETE /auth/sign_out
  def destroy
    super
  end
end
