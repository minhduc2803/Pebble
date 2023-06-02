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
    url      { "#{Video::EMBED_URL}#{Faker::Movie.name}" }
    title   { Faker::Movie.name }
    description { Faker::Movie.quote }
    association :user, factory: :user
  end
end
