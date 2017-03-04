class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :desc
      t.integer :points
      t.integer :project_id

      t.timestamps null: false
    end
  end
end
