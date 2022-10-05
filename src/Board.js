import React from 'react';
import Square from './Square.js'

const board = function Board(props){

  function renderSquare(i){
    let winner_check;
    if(props.winner!=null && props.winner.indexOf(i)!== -1){
        winner_check = true;  
    }
    else{
      winner_check = false;
    }   
    return (
      <Square
        value={props.squares[i]}
        winner_square_check = {winner_check}
        onClick={() => props.onClick(i)}
      />
    );
  }

  var count = 0;
  var square_draw = [];
  const table = [];    
  for(var row = 0; row<5; row++)
  { 
    for (var col = 0; col<5; col++) {
      square_draw.push(renderSquare(count));
      count++;
    }    
    table.push(<div className="board-row">{square_draw}</div> )
    square_draw = [];
  }
  return(
    <div>
       {table}
    </div>
  );
}

export default board; 