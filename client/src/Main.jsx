import React from 'react';
import Search from './Search.jsx';
import axios from 'axios';

const Main = () => {
  function searchGames(title, genre, platform) {
    axios.get('http://localhost:3000/games', {
      params: {
        query: title,
        genres: genre,
        platforms: platform
      }
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  return (
    <Search searchGames={searchGames} />
  )
}

export default Main;