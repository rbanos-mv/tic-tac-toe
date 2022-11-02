/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const players = [
    { name: 'Player X', symbol: 'X' },
    { name: 'Player O', symbol: 'O' },
  ];
  const randomPlayer = Date.now() % 2;
  const [player, setPlayer] = useState(players[randomPlayer]);
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState([]);
  const [winMoves, setWinMoves] = useState([]);

  function restartGame() {
    const randomPlayer = Date.now() % 2;
    setPlayer(players[randomPlayer]);
    setWinner(null);
    setMoves([]);
    setWinMoves([]);
  }

  useEffect(() => {
    const diagonalWin = ['1,1', '2,2', '3,3'];
    const diagonalReverseWin = ['1,3', '2,2', '3,1'];

    function getWinMoves(x, y, d, r) {
      if (x > 0) return [1, 2, 3].map((yy) => `${x},${yy}`);
      if (y > 0) return [1, 2, 3].map((xx) => `${xx},${y}`);
      if (d === 3) return diagonalWin;
      if (r === 3) return diagonalReverseWin;
      return [];
    }

    function playerWon(filteredMoves) {
      const xValues = [0, 0, 0];
      const yValues = [0, 0, 0];
      let diagonal = 0;
      let diagonalReverse = 0;

      filteredMoves.forEach((move) => {
        xValues[move.coord[0] - 1] += 1;
        yValues[move.coord[1] - 1] += 1;

        const moveCoordJoin = move.coord.join();
        if (diagonalWin.includes(moveCoordJoin)) diagonal += 1;
        if (diagonalReverseWin.includes(moveCoordJoin)) diagonalReverse += 1;
      });

      const x = xValues.indexOf(3) + 1;
      const y = yValues.indexOf(3) + 1;
      const win = getWinMoves(x, y, diagonal, diagonalReverse);
      setWinMoves(win);
      return win.length > 0;
    }

    if (moves.length < 5) return;

    const currentPlayer = moves[moves.length - 1].player;

    const playerMoves = moves.filter((move) => move.player.name === currentPlayer.name);

    if (playerWon(playerMoves)) {
      setWinner({ name: currentPlayer.name, title: 'Winner' });
    } else if (moves.length > 8) setWinner({ name: '', title: 'Tied match' });
  }, [moves]);

  function addMove(coord, winnerOrPopulated) {
    if (winnerOrPopulated) return;

    const newMoves = [...moves];
    newMoves.push({ player, coord });

    setMoves(newMoves);
    setPlayer(player.name === players[0].name ? players[1] : players[0]);
  }

  function Tile({ coord }) {
    const coordStr = coord.join();
    const populatedCoord = moves.find((move) => move.coord.join() === coordStr);

    const text = populatedCoord?.player?.symbol || '';

    const className = `tile${winMoves.includes(coordStr) ? ' text-red' : ''}`;

    return (
      <div className={className} onClick={() => addMove(coord, winner || populatedCoord)} role="button" tabIndex="0">
        {text}
      </div>
    );
  }

  Tile.propTypes = {
    coord: PropTypes.arrayOf(PropTypes.number).isRequired,
  };

  return (
    <div className="App">
      <div className="game-board">
        <div className="tileRow">
          {[[1, 1], [2, 1], [3, 1]].map((coord) => (
            <Tile key={coord} coord={coord} />
          ))}
        </div>
        <div className="tileRow">
          {[[1, 2], [2, 2], [3, 2]].map((coord) => (
            <Tile key={coord} coord={coord} />
          ))}
        </div>
        <div className="tileRow">
          {[[1, 3], [2, 3], [3, 3]].map((coord) => (
            <Tile key={coord} coord={coord} />
          ))}
        </div>
      </div>
      <p>&nbsp;</p>
      {winner
        ? (
          <>
            <h2>{winner.title}</h2>
            <div>{winner.name}</div>
          </>
        )
        : (
          <>
            <h2>Current Player</h2>
            <div>{player.name}</div>
          </>
        )}
      <p>&nbsp;</p>
      <button type="button" onClick={() => restartGame()}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
