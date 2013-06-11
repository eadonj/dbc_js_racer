class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.integer :game_id
      t.integer :player_id
      t.integer :winner
      t.timestamps  
    end
    # add_index(:game_players, [:game_id, :player_id], :unique => true)
  end
end
