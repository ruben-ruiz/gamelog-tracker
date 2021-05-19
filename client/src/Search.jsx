import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';

const Search = ({searchGames}) => {
  const [getGameGenres, setGameGenres] = useState([]);
  const [getGamePlatforms, setGamePlatforms] = useState([]);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/genres')
    .then(response => setGameGenres(response.data))
    .catch(err => console.log('err'));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/platforms')
    .then(response => setGamePlatforms(response.data))
    .catch(err => console.log('err'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let gameTitle = title.split(' ').join('-').toLowerCase();
    let gameGenre = genre.split(' ').join('-').toLowerCase();
    let gamePlatform = platform.split(' ').join('-').toLowerCase();
    searchGames(gameTitle, gameGenre, gamePlatform);
  }

  return (
    <Form className="search-form" onSubmit={e => handleSubmit(e)}>
      <FormGroup>
        <Input type='text' name='titles' id='titleSearch' placeholder='search games by title' onChange={(e) => setTitle(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Input type="select" name="genre-select" id="genreSelect" onChange={(e) => setGenre(e.target.value)}>
          <option>All Genres</option>
          {getGameGenres ? getGameGenres.map((genre, index) => {
            return (
              <option key={index} value={genre.slug}>{genre.name}</option>
            )
          }) : <></>}
        </Input>
      </FormGroup>
      <FormGroup>
        <Input type="select" name="platform-select" id="platformSelect" onChange={(e) => setPlatform(e.target.value)}>
          <option>All Platforms</option>
          {getGamePlatforms ? getGamePlatforms.map((platform, index) => {
            return (
              <option key={index} value={platform.id}>{platform.name}</option>
            )
          }) : <></>}
        </Input>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default Search;