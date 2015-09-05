/// <reference path="dependencies/jquery.js" />
/// <reference path="dependencies/qunit-1.18.0.js" />
/// <reference path="dependencies/noughtsandcrosses.js" />
/// <reference path="dependencies/noughtsandcrossesai.js" />

function assertnewgame(assert){
  assert.ok(gameModel, "Game model exists");
  assert.equal(gameModel.status(),NoughtsAndCrossesBoardModel.messages.started, "Game started");
}

// -----------------------------------------------------------------------------------
QUnit.module("UI.Baseline");
QUnit.test("UI loads and tests run",3, function(assert){
  assert.ok( inputs );
  assert.ok( outputs );
  assert.ok( new NoughtsAndCrossesBoardModel("O") );
});

// -----------------------------------------------------------------------------------
QUnit.module("UI.Game Start");

QUnit.test("UI.When you choose Human and Noughts or Crosses I start a new game",function(assert){
  gameModel=null;
  inputs.chooseHuman.click();
  inputs.chooseNoughtsStarts.click();
  assertnewgame(assert);
  assert.equal(gameModel.whosMove(),"O", "O moves first");

  gameModel=null;
  inputs.chooseHuman.click();
  inputs.chooseCrossesStarts.click();
  assertnewgame(assert);
  assert.equal(gameModel.whosMove(),"X", "X moves first");
});

// -----------------------------------------------------------------------------------
QUnit.module("UI.Game Play");

QUnit.test("When you click on a square I record the play and update display", function(assert){
  inputs.chooseHuman.click();
  startNewGame("O");
  assert.equal(outputs.boardSquares[3][3].text().trim(), "", "Display: Last square starts blank");
  assert.equal(outputs.whosMove.text(),"O");
  inputs.board.find("td").last().click();
  assert.equal( gameModel.state[3][3], "O");
  assert.equal(outputs.boardSquares[3][3].text(),"O", "Display: Last square went to O");
  assert.equal(outputs.whosMove.text(),"X");
});
QUnit.test("I display a win", function (assert) {
  startNewGame("O");
  assert.notOk(outputs.winner.text().trim() ,"new game winner isn't blank");

  // This forloop results in a won game for O, diagonally from top right to bottom left:
  for(var i=1; i<=7; i++){
    inputs.board.find("td:eq(" + (i-1) + ")").click();
  }
  assert.equal(outputs.status.text(), NoughtsAndCrossesBoardModel.messages.finished, "game finished msg shows");
  assert.equal(outputs.winner.text(), strings.winnertext + "O", "Winner is O");

});

// -----------------------------------------------------------------------------------
QUnit.module("UI.AI Player.Game Start");

QUnit.test("When you choose Human or AI I clear the Who Goes First selection", function(assert){
  inputs.chooseCrossesStarts.click();
  inputs.chooseHuman.click();
  assert.notOk(inputs.chooseCrossesStarts.is(":checked"));
  inputs.chooseCrossesStarts.click();
  inputs.chooseAI.click();
  assert.notOk(inputs.chooseCrossesStarts.is(":checked"))
});
QUnit.test("When you choose AI I reveal AI-piece choice UI, and when you choose human I hide it.", function(assert){
  gameModel=null;
  inputs.chooseHuman.click();
  assert.notOk( inputs.chooseAIPieces.is(":visible") );

  inputs.chooseAI.click();
  assert.ok( inputs.chooseAIPieces.is(":visible") );
});

// -----------------------------------------------------------------------------------
QUnit.module("UI.AI Player.Game Play");

QUnit.test("When you choose AI and AI goes first, then the AI plays first move.", function(assert){
  inputs.chooseAI.click();
  inputs.chooseAICrosses.click();
  inputs.chooseCrossesStarts.click();
  //
  assert.equal( currentAI.myBoardModel.status(), NoughtsAndCrossesBoardModel.messages.inProgress);
});
