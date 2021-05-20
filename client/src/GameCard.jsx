import React, {useState, useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import axios from 'axios';

const GameCard = ({game}) => {
  const [logStatus, logSetStatus] = useState('');
  const [classStatus, classSetStatus] = useState('');

  useEffect(() => {
    let status = '';
    let statusClass = 'card-btn ';

    if (game.status === 'backlog') {
      status = 'Remove From Backlog';
      statusClass += 'card-btn-red';
      logSetStatus(status);
      classSetStatus(statusClass);
    } else if (game.status === 'completed disabled') {
      status = 'Completed';
      statusClass += 'card-btn-green';
      logSetStatus(status);
      classSetStatus(statusClass);
    } else if (game.status === 'playing') {
      status = 'Playing';
      statusClass += 'card-btn-yellow disabled';
      logSetStatus(status);
      classSetStatus(statusClass);
    } else {
      status = 'Add to Backlog';
      statusClass += 'card-btn-grey';
      logSetStatus(status);
      classSetStatus(statusClass);
    }
  }, [game.status])

  function addBacklog () {
    if (logStatus === 'Add to Backlog') {
      axios.post('http://localhost:3000/library', {
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
      .then(logSetStatus('Remove From Backlog'))
      .then(classSetStatus('card-btn card-btn-red'))
      .catch(err => console.log(err));
    } else if (logStatus === 'Remove From Backlog') {
      axios.delete('http://localhost:3000/library', {
        params: {id: game.id}
      })
      .then(logSetStatus('Add to Backlog'))
      .then(classSetStatus('card-btn card-btn-grey'))
      .catch(err => console.log(err))
    }
  }

  //overwriting game.genres to be a string
  let genres = (game.genres).map(genre => genre.name).join(', ');

  return (
    <Card>
      <CardImg src={game.background_image} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{game.name}</CardTitle>
        <CardText>Released: {game.released}</CardText>
        <CardText>Rating: {game.rating}/{game.rating_top}</CardText>
        <CardText>{genres}</CardText>
        <Button className={classStatus} onClick={() => addBacklog()}>{logStatus}
        </Button>
      </CardBody>
    </Card>
  );
};

export default GameCard;