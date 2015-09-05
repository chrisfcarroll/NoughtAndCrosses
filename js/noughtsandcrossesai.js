/// <reference path="noughtsandcrosses.js" />

function playFirstEmptySpace(boardModel){
  for(var i=1; i<=3; i++)
  for(var j=1; j<=3; j++) {
    if (!boardModel.state[i][j]) {
      return {x: i, y: j};
    }
  }
  throw new Error("You asked me to play but there are no empty spaces left to play in")
}

function playLines(boardModel,myPieces){
  var theirPieces= myPieces=="X" ? "O" : "X";
  for(var i=1; i<=3; i++)
  for(var j=1; j<=3; j++) {
    if (!boardModel.state[i][j]) {
      if(  (j==1 && boardModel.state[i][2]==myPieces && boardModel.state[i][3]==myPieces)
        || (j==2 && boardModel.state[i][1]==myPieces && boardModel.state[i][3]==myPieces)
        || (j==3 && boardModel.state[i][1]==myPieces && boardModel.state[i][2]==myPieces)

        || (j==1 && boardModel.state[i][2]!=theirPieces && boardModel.state[i][3]!=theirPieces)
        || (j==2 && boardModel.state[i][1]!=theirPieces && boardModel.state[i][3]!=theirPieces)
        || (j==3 && boardModel.state[i][1]!=theirPieces && boardModel.state[i][2]!=theirPieces)
      ){
        return {x:i, y:j};
      }
    }
  }
  return playFirstEmptySpace(boardModel);
}

function NoughtsAndCrossesAI(strategy){

  if(typeof strategy != "function"){strategy=playLines;}

  var that=this;

  this.startPlaying= function(myPieces, whoStarts, gameBoard, playMoveCallback){
    if(myPieces!="X" && myPieces!="O"){throw new Error("I only know how to play as O or X.");}
    if(whoStarts!="X" && whoStarts!="O"){throw new Error("Either O or X has to start the game");}
    if(! (gameBoard instanceof NoughtsAndCrossesBoardModel) ){throw new Error("We need a noughts and crosses board to play on")}
    //
    that.myPieces=myPieces;
    that.gameBoard= gameBoard;
    that.playMoveCallback= playMoveCallback;
    that.myBoardModel= new NoughtsAndCrossesBoardModel(whoStarts);
    if(that.myBoardModel.whosMove() == that.myPieces){that.play()}
  };

  this.play= function(){
    var move= strategy(that.gameBoard, that.myPieces);
    that.myBoardModel.play(move.x, move.y);
    that.playMoveCallback(move.x, move.y);
  };

  this.promptToMove= this.play;

}

