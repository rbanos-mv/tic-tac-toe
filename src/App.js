/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useState } from 'react';
import './App.css';

function App() {
  const players = [
    { name: 'Player X', symbol: 'X' },
    { name: 'Player O', symbol: 'O' },
  ];
  const randomPlayer = Date.now() % 2;
  const [player, setPlayer] = useState(players[randomPlayer]);
  const [moves, setMoves] = useState([]);

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
      <>
        <h2>Current Player</h2>
        <div>{player.name}</div>
      </>
    </div>
  );
}

export default App;
