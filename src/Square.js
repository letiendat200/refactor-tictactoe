const square = function Square(props) {
    let winner_check;
    if(props.winner_square_check){
      winner_check = "square-winner";
    }
    else{
      winner_check = "square";
    } 
    return (
      <button className={winner_check} onClick={props.onClick}>
        {props.value}
      </button>
    );
    
  }
  export default square;