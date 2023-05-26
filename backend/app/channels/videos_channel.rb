class VideosChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'video_channel'
  end

  def unsubscribed; end
end
