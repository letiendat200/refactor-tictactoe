import React,{useState} from 'react';
import './index.css';
import Board from './Board.js'

const game = function Game() {
  const [playHistory, setPlayHistory] = useState([{squares: Array(25).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [squareHistory,setSquareHistory] = useState([]);
  const [reverseHistoryCheck,setReverseHistory] = useState(false);
  
  function handleClick(i) {
    var oldHistory = playHistory.slice(0,stepNumber + 1);
    const current = oldHistory[oldHistory.length - 1];   
    const squares = current.squares.slice()
    const square_history = squareHistory.slice(0, stepNumber);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }    
    squares[i] = xIsNext ? 'X' : 'O';   
    oldHistory = oldHistory.concat([{squares: squares,}]);
    console.log(oldHistory);
    setPlayHistory(oldHistory);   
    setStepNumber(oldHistory.length - 1);
    setXIsNext(!xIsNext);
    setSquareHistory(square_history.concat(i));    
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  function reverseHistory() {    
    setReverseHistory(!reverseHistoryCheck);
  };
  console.log(playHistory[0]);
  console.log(stepNumber);
  const current = playHistory[stepNumber].squares;
  
  const winning_squares = calculateWinner(current);
  const winner = winning_squares?current[winning_squares[0]]:false;
  const square_history = squareHistory;
  let history_button;
  
  const moves = playHistory.map((step, move) => {
    const desc = move ?
      'Go to move #' + move + ' col: ' + square_history[move-1]%5 + ' row: '+ Math.floor(square_history[move-1]/5):
      'Go to game start';
      if(move===stepNumber)
      {
        history_button = <button className='current-button-history' onClick={() => jumpTo(move)}>{desc}</button>;          
      }
      else{
        history_button = <button onClick={() => jumpTo(move)}>{desc}</button>;
      }
      return (
        <li key={move}>
          {history_button}
        </li>
      );
  });

  if(reverseHistoryCheck){
    moves.reverse();
  }

  let status;
  let winner_check;    
  if (winner) {
    status = 'Winner: ' + winner;
    winner_check = winning_squares;      
  } else {
    winner_check= null;
    if(stepNumber == 25){
      status = 'Draw Game'
    }else{
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }      
  } 
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current}
          winner={winner_check}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          <input type="checkbox" onChange={() => reverseHistory()}/> Reverse History           
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  );

}
function calculateWinner(squares) {
    if(squares){        
        const lines = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24],
            [0, 6, 12, 18, 24],
            [4, 8, 12, 16, 20],
        ];
        let winningSquares = [];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c, d, e] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]&& squares[a] === squares[d]&& squares[a] === squares[e]) 
            {
            winningSquares = winningSquares.concat(lines[i]);      
            return winningSquares;
            }
        }
    }
    return null;  
}

export default game;