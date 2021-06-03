import React, {useState, useEffect} from 'react';
import GameCard from './GameCard.jsx';
import axios from 'axios';

const GamesDisplay = ({games}) => {
  const [backlog, setBacklog] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    axios.get('/api/library')
    .then(response => setBacklog(response.data))
    .then(setBusy(false))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    console.log(games);
    const scrolling_function = () => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight-10){
            axios.get('/api/games/next', {
              params: {
                query: games.next,
              }
            })
            .then(response => games.results.concat(response.data))
            .catch(err => console.log(err))
            window.removeEventListener('scroll',scrolling_function)
        }
    }
    window.addEventListener('scroll', scrolling_function);
  }, [])

  return (
    <div className="games-display">
      {isBusy ? <></> :
        (games.results).map((game,index) => {
          for (let i = 0; i < backlog.length; i++) {
            if (backlog[i].id === game.id) {
              game.status = backlog[i].status;
              return <GameCard game={game} key={index}/>
            }
          }
          game.status = ''
          return <GameCard game={game} key={index}/>
        })
      }
    </div>
  )
}

export default GamesDisplay;