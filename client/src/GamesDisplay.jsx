import React from 'react';
import GameCard from './GameCard.jsx';

const GamesDisplay = ({games}) => {
  return (
    <div className="games-display">
      {(games.results).map((game,index) => <GameCard game={game} key={index}/>)}
    </div>
  )
}

export default GamesDisplay;