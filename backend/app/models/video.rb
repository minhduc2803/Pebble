# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  yt_video_id :string           not null
#

class Video < ApplicationRecord
  belongs_to :user
  scope :of_user, -> (user) { where(user_id: user.id)}

  validates_presence_of :yt_video_id
end
