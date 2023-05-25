class ApplicationController < ActionController::API
  include ActAsApiRequest
  include Pundit::Authorization
  include Knock::Authenticable

  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :authenticate_user
  # skip the CSRF protection
  skip_before_action :verify_authenticity_token, raise: false

  rescue_from ActiveRecord::RecordNotFound,        with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid,         with: :render_record_invalid
  rescue_from ActionController::ParameterMissing,  with: :render_parameter_missing

  def status
    render json: { online: true }
  end

  private

  def render_not_found(exception)
    logger.info { exception } # for logging
    render json: { error: I18n.t('api.errors.not_found') }, status: :not_found
  end

  def render_record_invalid(exception)
    logger.info { exception } # for logging
    render json: { errors: exception.record.errors.as_json }, status: :bad_request
  end

  def render_parameter_missing(exception)
    logger.info { exception } # for logging
    render json: { error: I18n.t('api.errors.missing_param') }, status: :unprocessable_entity
  end
end
