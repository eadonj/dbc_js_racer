$(document).ready(function() {

  var Game = {};

  function Player(name, selector, keystroke){
    this.name = name,
    this.selector = selector,
    this.keystroke = keystroke,
    this.location = 0;
  }

  var gameEnd = $("#player1_strip td").length - 1;

  $(document).on('keyup', function(event) {
    if (Game.player1.location == gameEnd || Game.player2.location == gameEnd) {
      Game.end = +new Date();
      Game.diff = Game.end - Game.start;
      if (Game.player1.location == gameEnd){
        winner = Game.player1.name;
      }
      else if (Game.player2.location == gameEnd) {
        winner = Game.player2.name;
      }
      $(".racer_table").fadeOut(300);
      $("#winner").html(winner + " is the winner!").delay(500).fadeIn(300);
      
      $.ajax({
        type: "POST",
        url: '/game',
        data: {player_one: Game.player1, player_two: Game.player2, winner: winner, timer: Game.diff}
      }).done(function(data){
        
        $('#url').html('/game/stats/'+data[0]+'/'+data[1]).fadeIn(300);
        $('#time').html('Time to victory: '+data[1]).fadeIn(300);
        $("#reset").fadeIn(300);
      });
    } else {
      if (event.which == Game.player1.keystroke){
        move_player(Game.player1);
      }
      else if (event.which == Game.player2.keystroke)
      {
        move_player(Game.player2);
      }
    }
  });

  var move_player = function(player) {
    player.location++;
    $(player.selector+"_strip td").removeClass('active');
    $(player.selector+"_strip td:eq(" + player.location + ")").addClass('active');
  };

  var reset = function(){
    Game.player1.location = -1;
    Game.player2.location = -1;
    move_player(Game.player1);
    move_player(Game.player2);
  };

  // $("#new_game").on('click', reset);

  $("#player2").on('submit', function(e){
    e.preventDefault();
    $(".container").fadeOut(300);
    Game.player2 = new Player( $("#player2 input").val(), "#player2", 77 );
    $('.racer_table').delay(1000).fadeIn(100);
    Game.start = +new Date();
  });

  $("#player1").on('submit', function(e){
    e.preventDefault();
    Game.player1 = new Player( $("#player1 input").val(), "#player1", 90 );
    $("#player1").fadeOut(300);
    $("#player2").delay(500).fadeIn(300);
  });
});

