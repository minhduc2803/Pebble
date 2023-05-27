require 'rails_helper'

RSpec.describe VideosChannel, type: :channel do
  let(:user) { create(:user) }

  before do
    subscribe(user_id: user.id)
  end

  it 'broadcasts a video when created' do
    subscribe
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from('video_channel')

    video_params = {
      url: 'https://example.com/video',
      title: 'Test Video',
      description: 'This is a test video',
    }
    perform(:create, video: video_params)

    
    expect {
      ActionCable.server.broadcast('video_channel', video_params)
    }.to have_broadcasted_to('video_channel')
      .with{ |data| expect(data).to eq(video_params.with_indifferent_access) }
  end
end
