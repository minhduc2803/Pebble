class VideosController < ApplicationController
  skip_before_action :authenticate_user,  only: [:index]
  before_action :authorize_user, only: [:create]

  # GET /videos
  def index
    videos = policy_scope(Video).includes(:user).order(created_at: :desc)
    videos = videos.map do |video|
      video.attributes.merge({
        user: {
          id: video.user.id,
          full_name: video.user.full_name,
          email: video.user.email
        }
      })
    end
    render json: { videos: videos }, status: :ok
  end

  # POST /videos
  def create
    video = current_user.videos.new(video_params)
    if video.save
      rendered_video = {
        id: video.id,
        url: video.url,
        title: video.title,
        description: video.description,
        user: {
          id: current_user.id,
          full_name: current_user.full_name,
          email: current_user.email
        }
      }
      ActionCable.server.broadcast('video_channel', rendered_video)
      render json: rendered_video, status: :created
    else
      render json: { errors: video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def video_params
    params.require(:video).permit(:url, :title, :description)
  end

  def authorize_user
    authorize current_user, policy_class: VideoUserPolicy
  end
end
