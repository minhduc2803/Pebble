class VideoUserPolicy < UserPolicy
  def create?
    @user.present?
  end
end
