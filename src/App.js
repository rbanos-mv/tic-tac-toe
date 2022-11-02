import PropTypes from 'prop-types';
import './App.css';

function App() {
  function Tile({ coord }) {
    return (
      <div className="tile">
        {coord}
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
