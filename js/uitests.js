/// <reference path="dependencies/jquery.js" />
/// <reference path="dependencies/qunit-1.18.0.js" />
/// <reference path="dependencies/noughtsandcrosses.js" />
QUnit.module("UI.Baseline");
QUnit.test("UI loads and tests run",3, function(assert){
  assert.ok( inputs );
  assert.ok( outputs );
  assert.ok( new NoughtsAndCrossesGame("noughts") );
});

QUnit.module("UI.Game Start");
QUnit.test("I autostart a game on page load",function(assert){
  assert.ok(gameModel);
});
QUnit.test("UI.When you click Noughts or Crosses I start a new game",function(assert){
  gameModel=null;
  inputs.chooseNoughts.click();
  assert.ok(gameModel);
  assert.equal(gameModel.status(),NoughtsAndCrossesGame.messages.started);
  assert.equal(gameModel.whosMove(),"O");
  gameModel=null;
  inputs.chooseCrosses.click();
  assert.ok(gameModel);
  assert.equal(gameModel.status(),NoughtsAndCrossesGame.messages.started);
  assert.equal(gameModel.whosMove(),"X");
});

QUnit.module("UI.Game play");
QUnit.test("When you click on a square I record the play and update display", function(assert){
  gameModel=new NoughtsAndCrossesGame("O");
  assert.equal(outputs.boardSquares[3][3].text().trim(), "", "Display: Last square starts blank");
  inputs.board.find("td").last().click();
  assert.equal( gameModel.state[3][3], "O");
  assert.equal(outputs.boardSquares[3][3].text(),"O", "Display: Last square went to O");
});
QUnit.test("I display a win", function (assert) {
  gameModel=new NoughtsAndCrossesGame("O");
  assert.equal(outputs.winner.text().trim(), nowinnertext ,"new game winner is still blank");

  // This forloop results in a won game for O, diagonally from top right to bottom left:
  for(var i=1; i<=7; i++){
    inputs.board.find("td:eq(" + (i-1) + ")").click();
  }
  assert.equal(outputs.status.text(), NoughtsAndCrossesGame.messages.finished, "game finished msg shows");
  assert.equal(outputs.winner.text(), "O", "Winner is O");

});