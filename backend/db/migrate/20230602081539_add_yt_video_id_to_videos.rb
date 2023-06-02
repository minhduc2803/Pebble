class AddYtVideoIdToVideos < ActiveRecord::Migration[7.0]
  def change
    remove_column :videos, :url, :string, null: false
    remove_column :videos, :title, :string, null: false
    remove_column :videos, :description, :string
    add_column :videos, :yt_video_id, :string, null: false
  end
end
