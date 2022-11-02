/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import { useState } from 'react';
import './App.css';

function App() {
  const [moves, setMoves] = useState([]);

  function addMove(coord) {
    const newMoves = [...moves];
    newMoves.push(coord);

    setMoves(newMoves);
  }

  function Tile({ coord }) {
    const populatedCoord = moves.find((move) => move.join() === coord.join());

    const text = populatedCoord || '';

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
    </div>
  );
}

export default App;
