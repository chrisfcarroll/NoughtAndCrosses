/// <reference path="dependencies/qunit-1.18.0.js" />
/// <reference path="dependencies/noughtsandcrosses.js" />
QUnit.module("Domain.Baseline");
QUnit.test("Domain loads and tests run",1, function(assert){
  assert.ok( NoughtsAndCrossesBoardModel );
});

QUnit.module("Domain.Board.Starting the game");
QUnit.test("You can start a new game", function(assert){
  var game= new NoughtsAndCrossesBoardModel( "O" );
  assert.equal( game.movesPlayed(),0, "Expected 0 moves played at start of game" );
  game= new NoughtsAndCrossesBoardModel( "X" );
  assert.equal( game.movesPlayed(),0, "Expected 0 moves played at start of game" );
});
QUnit.test("I record who's starting", function(assert){
  var game= new NoughtsAndCrossesBoardModel( "O" );
  assert.equal( game.whosMove(), "O" );
  game= new NoughtsAndCrossesBoardModel( "X" );
  assert.equal( game.whosMove(), "X" );
});

QUnit.module("Domain.Board.During play");
QUnit.test("Board knows whose turn it is and how many moves have been played",function(assert){
  var game = new NoughtsAndCrossesBoardModel("O").play(1, 1);
  assert.equal(game.movesPlayed(), 1, "record of movesPlayed = 1");
  var second= game.whosMove();
  assert.equal(second, "X");
  var third=game.play(2,1).whosMove();
  assert.equal(third,"O");
  assert.equal(game.movesPlayed(), 2, "record of movesPlayed = 2");
  //
  second= new NoughtsAndCrossesBoardModel( "X").play(2,2).whosMove();
  assert.equal(second, "O");
  var third=game.play(3,3).whosMove();
  assert.equal(third,"X");
});
QUnit.test("Board prevents you playing an non-empty space and set status to 'last move ignored' ",function(assert){
  var game = new NoughtsAndCrossesBoardModel("O").play(1, 1).play(1,1);
  assert.equal(game.movesPlayed(), 1);
  assert.equal(game.status(), NoughtsAndCrossesBoardModel.messages.lastMoveIgnored);
});
QUnit.test("Board detects a win for player 1",function(assert){
  var game = new NoughtsAndCrossesBoardModel("O")
              .play(1, 1).play(1, 2)
              .play(2, 2).play(1, 3)
              .play(3, 3);
  assert.equal(game.status(), NoughtsAndCrossesBoardModel.messages.finished);
  assert.equal(game.winner(), "O");
});
QUnit.test("Board detects a win for player 2",function(assert){
  var game = new NoughtsAndCrossesBoardModel("O")
    .play(1, 1).play(1, 2)
    .play(2, 1).play(2, 2)
    .play(3, 3).play(3, 2);
  assert.equal(game.status(), NoughtsAndCrossesBoardModel.messages.finished);
  assert.equal(game.winner(), "X");
});