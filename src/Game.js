import React from 'react';
import Board from './Board';

class Game extends React.Component {

  reset() {
    this.setState({
      history:[{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    });
  }

  componentWillMount() {
    this.reset();
  }

  handleClick = (i) => {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  };

  calculateWinner(squares) {
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

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    })
  }

  newGame = () => {
    this.reset();
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move ' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    });

    return (
      <div>
        <h3>Tic Tac Toe game for two players</h3>
        <p>
          <button onClick={this.newGame}>New Game</button>
        </p>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={this.handleClick}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <p>History</p>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Game;
