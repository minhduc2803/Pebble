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

  validates_presence_of     :url
  validates_presence_of     :title
  validate :validate_youtube_url

  EMBED_URL = 'https://www.youtube.com/embed/';
  WATCH_URL = 'https://www.youtube.com/watch?v=';

  def validate_youtube_url
    return if !url

    if !url.start_with?(EMBED_URL) & !url.start_with?(WATCH_URL)
      errors.add(:url, "must be a valid embed YouTube URL")
    end
  end
end
