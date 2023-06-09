class LikesController < ApplicationController
  before_action :authorize_user, only: [:create]
  before_action :authorize_like, only: [:destroy]

  # POST /likes
  def create
    like = Like.create(user: current_user, video_id: params[:video_id])
    if like.save
      render json: { like: like }, status: :created
    else
      render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DESTROY /likes
  def destroy
    if @like.destroy
      render json: { like: @like }, status: :ok
    else
      render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def like_params
    params.require(:video_id)
  end

  def authorize_user
    authorize current_user, policy_class: LikeUserPolicy
  end

  def authorize_like
    @like = Like.find_by(user_id: current_user.id, video_id: params[:video_id])
    authorize @like
  end
end
