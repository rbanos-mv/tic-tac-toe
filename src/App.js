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

  function playerWon(filteredMoves) {
    const xValues = [0, 0, 0];
    const yValues = [0, 0, 0];
    let diagonal = 0;
    let diagonalReverse = 0;

    filteredMoves.forEach((move) => {
      xValues[move.coord[0]] += 1;
      yValues[move.coord[1]] += 1;

      const moveCoordJoin = move.coord.join();
      if (['1,1', '2,2', '3,3'].includes(moveCoordJoin)) diagonal += 1;
      if (['1,3', '2,2', '3,1'].includes(moveCoordJoin)) diagonalReverse += 1;
    });

    return (Object.values(xValues).find((val) => val === 3)
            || Object.values(yValues).find((val) => val === 3)
            || diagonal === 3 || diagonalReverse === 3);
  }

  useEffect(() => {
    if (moves.length < 5) return;

    const currentPlayer = moves[moves.length - 1].player;

    const playerMoves = moves.filter((move) => move.player.name === currentPlayer.name);

    if (playerWon(playerMoves)) {
      setWinner({ name: currentPlayer.name, title: 'Winner' });
    } else if (moves.length > 8) setWinner({ name: '', title: 'Tied match' });
  }, [moves]);

  function addMove(coord) {
    const newMoves = [...moves];
    newMoves.push({ player, coord });

    setMoves(newMoves);
    setPlayer(player.name === players[0].name ? players[1] : players[0]);
  }

  function Tile({ coord }) {
    const populatedCoord = moves.find((move) => move.coord.join() === coord.join());

    const text = populatedCoord?.player?.symbol || '';

    return (
      <div className="tile" onClick={() => addMove(coord)} role="button" tabIndex="0">
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
    </div>
  );
}

export default App;
