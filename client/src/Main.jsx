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
    axios.get('/api/games', {
      params: {
        query: title,
        genres: genre,
        platforms: platform
      }
    })
    .then(response => setGames(response.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if (Object.entries(games).length === 0) return;
    const scrolling_function = () => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight-10){
            axios.get('/api/games/next', {
              params: {
                query: games.next,
              }
            })
            .then(response => response.data)
            .then(data => {
              setGames(games => ({
                results: games.results.concat(data.results),
                next: data.next,
              }))
            })
            .catch(err => console.log(err))
            window.removeEventListener('scroll',scrolling_function)
        }
    }
    window.addEventListener('scroll', scrolling_function);
  }, [games])

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