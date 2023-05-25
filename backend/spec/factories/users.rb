# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string
#  password_digest :string           default(""), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#

FactoryBot.define do
  factory :user do
    email      { Faker::Internet.unique.email }
    password   { Faker::Internet.password(min_length: 8) }
    uid        { Faker::Internet.uuid }
  end
end
