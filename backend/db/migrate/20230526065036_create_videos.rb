class CreateVideos < ActiveRecord::Migration[7.0]
  def change
    create_table :videos do |t|
      t.string :url, null: false
      t.string :title, null: false
      t.string :description
      t.bigint :user_id, null: false
      t.timestamps
    end

    add_foreign_key :videos, :users, column: :user_id
  end
end
