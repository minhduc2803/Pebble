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
FactoryBot.define do
  factory :video do
    url      { Faker::Internet.unique.email }
    title   { Faker::Movie.name }
    description { Faker::Movie.quote }
    association :user, factory: :user
  end
end
