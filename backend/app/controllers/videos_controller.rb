class VideosController < ApplicationController
  before_action :authorize_user, only: [:create]

  def index
    videos = policy_scope(Video)
    render json: { videos: videos }, status: :ok
  end

  def create
    video = current_user.videos.new(video_params)
    if video.save
      render json: { message: 'Video shared created successfully!' }, status: :created
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
