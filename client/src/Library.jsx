import React, {useState, useEffect} from 'react';
import GameCard from './GameCard.jsx';
import axios from 'axios';

const Library= ({isLoggedIn}) => {
  const [backlog, setBacklog] = useState([]);
  const [playing, setPlaying] = useState([]);
  const [completed, setCompleted] = useState([]);

  function getBacklog() {
    axios.get('/api/library/getBacklog')
    .then(response => {
      if (Array.isArray(response.data)) setBacklog(response.data);
      else throw new Error('not logged in');
    })
    .catch(err => console.log(err))
  }

  function getPlaying() {
    axios.get('/api/library/getPlaying')
    .then(response => {
      if (Array.isArray(response.data)) setPlaying(response.data);
      else throw new Error('not logged in');
    })
    .catch(err => console.log(err))
  }

  function getCompleted() {
    axios.get('/api/library/getCompleted')
    .then(response => {
      if (Array.isArray(response.data)) setCompleted(response.data);
      else throw new Error('not logged in');
    })
    .catch(err => console.log(err))
  }

  const getLibrary = React.useCallback(() => {
    if (isLoggedIn === true) {
      getBacklog();
      getPlaying();
      getCompleted();
    } else return;
  }, [isLoggedIn]);

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
      {isLoggedIn ?
      <>
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
      </> :
      <div className="library-notLoggedIn">Login to view your library</div>
      }
    </div>
  )
}

export default Library;