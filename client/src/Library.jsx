import React, {useState, useEffect} from 'react';
import GameCard from './GameCard.jsx';
import axios from 'axios';

const Library= () => {
  const [backlog, setBacklog] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [completed, setCompleted] = useState([]);

  function getBacklog() {
    axios.get('/api/library/getBacklog')
    .then(response => setBacklog(response.data))
    .catch(err => console.log(err))
  }

  function getPlaying() {
    axios.get('/api/library/getPlaying')
    .then(response => setPlaying(response.data))
    .catch(err => console.log(err))
  }

  function getCompleted() {
    axios.get('/api/library/getCompleted')
    .then(response => setCompleted(response.data))
    .catch(err => console.log(err))
  }

  const getLibrary = React.useCallback(() => {
    getBacklog();
    getPlaying();
    getCompleted();
  }, []);

  useEffect(() => {
    getLibrary();
  }, [getLibrary]);

  function handleChange(oldStatus, newStatus) {
    if (oldStatus === newStatus) return;

    if (oldStatus === 'Backlog') {
      setBacklog([]);
    }
    if (oldStatus === 'Playing') {
      setPlaying([]);
    }
    if (oldStatus === 'Completed') {
      setCompleted([]);
    }

    getLibrary();
  }

  return (
    <div className="library">
      <div className="library-category backlog">
        <h2>Backlog</h2>
        {backlog ? backlog.map((game,index) => <GameCard game={game} key={index} libraryCard={handleChange} />) : <></>}
      </div>
      <div className="library-category playing">
        <h2>Currently Playing</h2>
        {playing ? playing.map((game,index) => <GameCard game={game} key={index} libraryCard={handleChange} />) : <></>}
      </div>
      <div className="library-category completed">
        <h2>Completed</h2>
      {completed ? completed.map((game,index) => <GameCard game={game} key={index} libraryCard={handleChange} />) : <></>}
      </div>
    </div>
  )
}

export default Library;