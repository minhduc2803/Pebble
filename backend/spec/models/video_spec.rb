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

    it { should validate_presence_of(:url) }
    it { should validate_presence_of(:title) }

    describe '#validate_youtube_url' do
      context 'when the URL is a valid YouTube embed URL' do
        let(:video) { build(:video, url: 'https://www.youtube.com/embed/abc123') }

        it 'is valid' do
          video.valid?
          expect(video.errors[:url]).to be_empty
        end
      end

      context 'when the URL is a valid YouTube watch URL' do
        let(:video) { build(:video, url: 'https://www.youtube.com/watch?v=abc123') }

        it 'is valid' do
          video.valid?
          expect(video.errors[:url]).to be_empty
        end
      end

      context 'when the URL is a valid YouTube URL but not an embed or watch URL' do
        let(:video) { build(:video, url: 'https://www.youtube.com/abc123') }

        it 'is not valid' do
          video.valid?
          expect(video.errors[:url]).to include('must be a valid embed YouTube URL')
        end
      end
    end
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
