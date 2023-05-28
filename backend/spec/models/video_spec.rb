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
require 'rails_helper'

RSpec.describe Video, type: :model do
  describe 'validations' do
    subject { build(:video) }

    it { should validate_presence_of(:url) }
    it { should validate_presence_of(:title) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'scopes' do
    describe '.of_user' do
      let!(:user) { create(:user) }
      let!(:video1) { create(:video, user: user) }
      let!(:video2) { create(:video) }

      it 'returns videos associated with the given user' do
        videos = Video.of_user(user)
        expect(videos).to include(video1)
        expect(videos).not_to include(video2)
      end
    end
  end
end
