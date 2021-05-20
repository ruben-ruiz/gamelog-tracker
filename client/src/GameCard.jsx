import React, {useState} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import axios from 'axios';

const GameCard = ({game}) => {
  const [backlog, setBacklog] = useState(false);

  function addBacklog () {
    if (!backlog) {
      axios.post('http://localhost:3000/games', {
        id: game.id,
        slug: game.slug,
        name: game.name,
        released: game.released,
        background_image: game.background_image,
        rating: game.rating,
        rating_top: game.rating_top,
        genres: genres,
        status: 'backlog'
      })
      .then(setBacklog(!backlog))
      .catch(err => console.log(err));
    } else {
      axios.delete('http://localhost:3000/games', {
        params: {id: game.id}
      })
      .then(setBacklog(!backlog))
      .catch(err => console.log(err))
    }
  }

  //overwriting game.genres to be a string
  let genres = (game.genres).map(genre => genre.name).join(', ')

  return (
    <Card>
      <CardImg src={game.background_image} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{game.name}</CardTitle>
        <CardText>Released: {game.released}</CardText>
        <CardText>Rating: {game.rating}/{game.rating_top}</CardText>
        <CardText>{genres}</CardText>
        <Button className={`card-btn ${backlog ? 'card-btn-true': 'card-btn-false'}`} onClick={() => addBacklog()}>{backlog ? 'Remove from Backlog' : 'Add to Backlog'}</Button>
      </CardBody>
    </Card>
  );
};

export default GameCard;