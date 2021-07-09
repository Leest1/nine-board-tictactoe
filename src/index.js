import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Board from './components/board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: Array(9).fill(
        {
          squares: Array(9).fill(null),
        }
      ),
      boardState: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i, boardIndex) {
    const boards = this.state.boards;
    const squares = boards[boardIndex].squares.slice();
    const boardState = this.state.boardState;
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    boards[boardIndex] = {squares:squares};

    if (calculateWinner(squares)){
      boardState[boardIndex] = calculateWinner(squares);
    }

    this.setState({
      boards: boards,
      boardState: boardState,
      xIsNext: !this.state.xIsNext,
    });
  }

  resetBoard = () => {
    this.setState({
      boards: Array(9).fill(
        {
          squares: Array(9).fill(null),
        }
      ),
      boardState: Array(9).fill(null),
      xIsNext: true,
    });
  }

  render() {
    const boards = this.state.boards;
    const winner = calculateWinner(this.state.boardState);
    let status;
    if (winner) {
      status = 'Winner : ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="game-info">
          <div>{status}</div>
          { winner &&
            <button onClick={this.resetBoard}>
              Reset?
            </button>
          }
        </div>
        <div className="game">
          <div className="game-board">
            <Board
              squares={boards[0].squares}
              onClick={(i) => this.handleClick(i, 0)}
            />
          </div>
          <div className="game-board">
            <Board
              squares={boards[1].squares}
              onClick={(i) => this.handleClick(i, 1)}
            />
          </div>
          <div className="game-board">
            <Board
              squares={boards[2].squares}
              onClick={(i) => this.handleClick(i, 2)}
            />
          </div>
        </div>

        <div className="game">
          <div className="game-board">
            <Board
              squares={boards[3].squares}
              onClick={(i) => this.handleClick(i, 3)}
            />
          </div>
          <div className="game-board">
            <Board
              squares={boards[4].squares}
              onClick={(i) => this.handleClick(i, 4)}
            />
          </div>
          <div className="game-board">
            <Board
              squares={boards[5].squares}
              onClick={(i) => this.handleClick(i, 5)}
            />
          </div>
        </div>

        <div className="game">
          <div className="game-board">
            <Board
              squares={boards[6].squares}
              onClick={(i) => this.handleClick(i, 6)}
            />
          </div>
          <div className="game-board">
            <Board
              squares={boards[7].squares}
              onClick={(i) => this.handleClick(i, 7)}
            />
          </div>
          <div className="game-board">
            <Board
              squares={boards[8].squares}
              onClick={(i) => this.handleClick(i, 8)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
