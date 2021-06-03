import React, {useState, useEffect} from 'react';
import GameCard from './GameCard.jsx';
import axios from 'axios';

const Library= () => {
  const [backlog, setBacklog] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    axios.get('/api/library')
    .then(response => response.data)
    .then(async data => {
      let backlogArr = [];
      let playingArr = [];
      let completedArr = [];
      for await (let game of data) {
        if (game.status === 'backlog') {
          backlogArr.push(game);
        } else if (game.status === 'playing') {
          playingArr.push(game);
        } else if (game.status === 'completed') {
          completedArr.push(game);
        }
      }
      setBacklog(backlogArr);
      setPlaying(playingArr);
      setCompleted(completedArr);
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="library">
      <div className="library-category backlog">
        <h2>Backlog</h2>
        {backlog ? backlog.map((game,index) => <GameCard game={game} key={index} />) : <></>}
      </div>
      <div className="library-category playing">
        <h2>Currently Playing</h2>
        {playing ? playing.map((game,index) => <GameCard game={game} key={index} />) : <></>}
      </div>
      <div className="library-category completed">
        <h2>Completed</h2>
      {completed ? completed.map((game,index) => <GameCard game={game} key={index} />) : <></>}
      </div>
    </div>
  )
}

export default Library;