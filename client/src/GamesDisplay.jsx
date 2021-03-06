import React, {useState, useEffect} from 'react';
import GameCard from './GameCard.jsx';
import axios from 'axios';

const GamesDisplay = ({games}) => {
  const [backlog, setBacklog] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    axios.get('/api/library/getAll')
    .then(response => {
      if (Array.isArray(response.data)) setBacklog(response.data);
      else throw new Error('not logged in');
    })
    .then(setBusy(false))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="games-display">
      {isBusy ? <></> :
        (games.results).map((game,index) => {
          if (game) {
            for (let i = 0; i < backlog.length; i++) {
              if (backlog[i].id === game.id) {
                game._id = backlog[i]._id;
                game.status = backlog[i].status;
                return <GameCard game={game} key={index}/>
              }
            }
            game.status = ''
            return <GameCard game={game} key={index}/>
          } else return <></>
        })
      }
    </div>
  )
}

export default GamesDisplay;