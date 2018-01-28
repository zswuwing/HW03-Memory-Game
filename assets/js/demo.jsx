{/* <!-- this application have some reference about react tutorial https://reactjs.org/tutorial/tutorial.html --> */}
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';


export default function run_demo(root) {
  ReactDOM.render(<Demo />, root);
}

class Demo extends React.Component {
    constructor() {
      super();
      this.state = {
        value: ["A","B","C","D","E","F","G","H","A","B","C","D","E","F","G","H"],
        history: Array(16).fill(""),
        current: Array(16).fill(""),
        firstClick: -1,
        secondClick: -1,
        stepNumber: 0,
        resetOrnot: false,
      };
    }

    showHisory() {
      this.setState({

              current: this.state.history,
              secondClick: -1,
              firstClick: -1,
              stepNumber: this.state.stepNumber
          });

    }

    reset(){
      let one = _.shuffle(this.state.value);
  
      this.setState({
        value: one,
        history: Array(16).fill(""),
        current: Array(16).fill(""),
        firstClick: -1,
        secondClick: -1,
        stepNumber: 0,
        resetOrnot: false,
      });
    }




    handleClick(i){
      clearTimeout(this.state.ID);

      if(this.state.firstClick == -1) {
        const squares = this.state.history.slice();
        if(squares[i] != "") {
          return;
        }
        squares[i] = this.state.value[i];



        this.setState({
          current: squares,
          secondClick: -1,
          firstClick: i,
          stepNumber: this.state.stepNumber + 1
        });
        
      }
      else if (this.state.firstClick != -1 && this.state.secondClick == -1) {

        const squares = this.state.current.slice();
        if(squares[i] != "") {
          return;
        }
        squares[i] = this.state.value[i];
        if(this.state.value[this.state.firstClick] == this.state.value[i]) {
          
          this.setState({
              history: squares,
              current: squares,
              secondClick: -1,
              firstClick: -1,
              stepNumber: this.state.stepNumber + 1
          });
          return;

        }
        else {

          this.setState({
              
              current: squares,
              secondClick: i,
              stepNumber: this.state.stepNumber + 1
          });
          this.state.ID = setTimeout(this.showHisory.bind(this),1000)
          
          

          


          

        }
      }
      else if (this.state.firstClick != -1 && this.state.secondClick != -1){

        this.setState({
              current: this.state.history,
              secondClick: -1,
              firstClick: -1,
          });

      }



    };
    




  render() {
    const current = this.state.current;
    const value = this.state.value;


    return (
      <div className="game" >
        <div className="game-board">
          <Board
            squares={current}
            orin = {value}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div >
          <button onClick={() => this.reset()}>Reset the Game</button>
          <p>Clicks Count: {this.state.stepNumber}</p>
        </div>

      </div>


    );
  }
}


class Square extends React.Component {
  constructor() {
      super();
      this.state = {
        value: null,
      };
    }
    
    render() {
      return (
          <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
          </button>
      );
    }
}

class Board extends React.Component {
  constructor() {
      super();
      this.state = {
        value: null,
      };
    }

 

    renderSquare(p,i,s) {
      return <Square value={this.props.squares[p]} place={p} onClick={() => this.props.onClick(p,i)} origin={this.props.value}/>;
    }


    render() {
      if(this.props.delayOrNot == true) {

      }

      return (
      <div>
        <div className="board-row">
            {this.renderSquare(0,"A")}
            {this.renderSquare(1,"B")}
            {this.renderSquare(2,"C")}
            {this.renderSquare(3,"D")}
        </div>
        <div className="board-row">
            {this.renderSquare(4,"E")}
            {this.renderSquare(5,"F")}
            {this.renderSquare(6,"G")}
            {this.renderSquare(7,"H")}
        </div>
        <div className="board-row">
            {this.renderSquare(8,"A")}
            {this.renderSquare(9,"B")}
            {this.renderSquare(10,"C")}
            {this.renderSquare(11,"D")}
        </div>
        <div className="board-row">
            {this.renderSquare(12,"E")}
            {this.renderSquare(13,"F")}
            {this.renderSquare(14,"G")}
            {this.renderSquare(15,"H")}
        </div>
      </div>
        );


      
  }
}