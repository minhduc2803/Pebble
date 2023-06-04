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
FactoryBot.define do
  factory :video do
    yt_video_id      { Faker::Movie.name }
    association :user, factory: :user
  end
end
