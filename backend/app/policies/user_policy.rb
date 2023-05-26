class UserPolicy < ApplicationPolicy
  def create?
    true
  end

  def user_info?
    @record.present?
  end
end
