import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import GamesDisplay from './GamesDisplay.jsx';
import axios from 'axios';

const Main = () => {
  const [games, setGames] = useState({});

  useEffect(() => {
    searchGames();
  }, [])

  function searchGames(title, genre, platform) {
    axios.get('http://localhost:3000/games', {
      params: {
        query: title,
        genres: genre,
        platforms: platform
      }
    })
    .then(response => setGames(response.data))
    .catch(err => console.log(err))
  }

  if (Object.keys(games).length === 0) {
    return (
      <div className="main"></div>
    )
  } else {
    return (
      <div className="main">
        <Search searchGames={searchGames} />
        <GamesDisplay games={games} />
      </div>
    )
  }
}

export default Main;