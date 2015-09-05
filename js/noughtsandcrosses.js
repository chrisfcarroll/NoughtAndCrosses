function NoughtsAndCrossesBoardModel(whoMovesFirst){
  this.state= {
    "1" : { "1": "", "2": "", "3":""},
    "2" : { "1": "", "2": "", "3":""},
    "3" : { "1": "", "2": "", "3":""},
    status : NoughtsAndCrossesBoardModel.messages.started,
    winner : null
  };
  if(whoMovesFirst=="O"){
    this.state.whosMove= "O";
  }else if(whoMovesFirst="X"){
    this.state.whosMove= "X";
  }else{
    throw new Error('You must choose either "O" or "X".');
  }

  this.status= function(){return this.state.status;};

  this.state.opponentPieces= whoMovesFirst;
  this.whosMove= function(){return this.state.whosMove;};

  this.state.movesPlayed=0;
  this.movesPlayed=function(){return this.state.movesPlayed;};

  this.play= function(x,y){
    if(this.state.status==NoughtsAndCrossesBoardModel.messages.finished){
      return this;
    }
    if(this.state[x][y] != ""){
      this.state.status= NoughtsAndCrossesBoardModel.messages.lastMoveIgnored;
      return this;
    }
    //
    this.state[x][y]=this.state.whosMove;
    this.state.whosMove= this.state.whosMove=="X" ? "O" : "X";
    this.state.movesPlayed++;
    this.state.status=NoughtsAndCrossesBoardModel.messages.inProgress;
    //
    this.checkGameEnd();
    return this;
  };

  this.setWinner= function(winner, column, row, diag) {
    this.state.status=NoughtsAndCrossesBoardModel.messages.finished;
    this.state.winner=winner;
  };

  this.checkGameEnd= function(){
    for(var i=1; i<=3; i++){
      var toprow= this.state[i][1];
      if(toprow!="" && toprow == this.state[i][2] && toprow == this.state[i][3]){
        this.setWinner(toprow,i,0);
        return;
      }
      var leftcol= this.state[1][i];
      if(leftcol!="" && leftcol == this.state[2][i] && leftcol == this.state[3][i]){
        this.setWinner(leftcol,0,i);
        return;
      }
    }
    var topleft= this.state[1][1];
    if(topleft!="" && topleft == this.state[2][2] && topleft == this.state[3][3]){
      this.setWinner(topleft,0,0,"topleft");
      return;
    }
    var topright= this.state[1][3];
    if(topright!="" && topright == this.state[2][2] && topright == this.state[3][1]){
      this.setWinner(topright,0,0,"topright");
      return;
    }
  };

  this.winner= function(){ return this.state.winner;}

}

NoughtsAndCrossesBoardModel.messages={
  started: "Game started",
  inProgress: "Game in progress",
  lastMoveIgnored:"Last move was ignored because illegal",
  finished:"Finished"
};

