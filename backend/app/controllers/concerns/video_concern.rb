module VideoConcern
  extend ActiveSupport::Concern

  def self.share_video(url, user)
    video = user.videos.new

    url_attrs = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
    video.yt_video_id = url_attrs[2] ? url_attrs[2].split(/[^0-9a-z_-]/i)[0] : nil
    video_info = Yt::Video.new(id: video.yt_video_id)
    begin
      video_info.title
      video.save!
      ActionCable.server.broadcast('video_channel', {
        id: video.id,
        yt_video_id: video.yt_video_id,
        title: video_info.title,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email
        }
      })
    rescue
      video.errors.add(:url, "is not valid, can not retrieve data from this URL.")
    end

    video
  end
end
