class CreateLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.bigint :user_id, null: false
      t.bigint :video_id, null: false
      t.timestamps
    end

    add_foreign_key :likes, :users, column: :user_id
    add_foreign_key :likes, :videos, column: :video_id
  end
end
