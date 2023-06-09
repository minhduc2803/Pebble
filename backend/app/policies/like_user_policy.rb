class LikeUserPolicy < UserPolicy
  def create?
    @user.present?
  end
end
