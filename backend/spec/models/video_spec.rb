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
require 'rails_helper'

RSpec.describe Video, type: :model do
  describe 'validations' do
    subject { build(:video) }

    it { should validate_presence_of(:yt_video_id) }
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
