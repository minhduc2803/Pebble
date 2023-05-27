class UserPolicy < ApplicationPolicy
  def create?
    true
  end

  def user_info?
    @user.id == @record.id
  end
end
