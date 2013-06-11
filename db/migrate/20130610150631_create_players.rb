class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :initial
      t.timestamps
    end 
  end
end
