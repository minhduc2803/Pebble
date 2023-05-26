# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  url         :string           not null
#  title       :string           not null
#  description :string
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Video < ApplicationRecord
  belongs_to :user
  scope :of_user, -> (user) { where(user_id: user.id)}
end
