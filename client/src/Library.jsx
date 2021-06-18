import React, {useState, useEffect} from 'react';
import GameCard from './GameCard.jsx';
import axios from 'axios';

const Library= () => {
  const [backlog, setBacklog] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [completed, setCompleted] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/library')
  //   .then(response => console.log(response.data))
  //   // .then(async data => {
  //   //   let backlogArr = [];
  //   //   let playingArr = [];
  //   //   let completedArr = [];
  //   //   for await (let game of data) {
  //   //     if (game.status === 'Backlog') {
  //   //       backlogArr.push(game);
  //   //     } else if (game.status === 'Playing') {
  //   //       playingArr.push(game);
  //   //     } else if (game.status === 'Completed') {
  //   //       completedArr.push(game);
  //   //     }
  //   //   }
  //   //   setBacklog(backlogArr);
  //   //   setPlaying(playingArr);
  //   //   setCompleted(completedArr);
  //   // })
  //   .catch(err => console.log(err))
  // }, [])

  useEffect(() => {
    axios.get('/api/library/getBacklog')
    .then(response => setBacklog(response.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('/api/library/getPlaying')
    .then(response => setPlaying(response.data))
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    axios.get('/api/library/getCompleted')
    .then(response => setCompleted(response.data))
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