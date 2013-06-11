get '/' do
  erb :index
end

post '/game' do
  content_type :json

  user_one = Player.find_or_create_by_initial(params[:player_one][:name])
  user_two = Player.find_or_create_by_initial(params[:player_two][:name])
  
  game = Game.create
  game.players << [user_one, user_two]

  player = Player.find_by_initial(params[:winner])
  round = Round.find_by_player_id_and_game_id(player.id, game.id)
  round.winner = true
  round.save
  time = params[:timer].to_f / 1000
  [game.id, time].to_json
end

get '/game/stats/:id/:time' do
  @round = Round.find_by_game_id(params[:id])
  @timer = params[:time]
  erb :stats
end
