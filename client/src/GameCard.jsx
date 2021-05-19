import React, {useState, useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const GameCard = ({game}) => {
  const [backlog, setBacklog] = useState(false);

  return (
    <Card>
      <CardImg top width="100%" src={game.background_image} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{game.name}</CardTitle>
        <CardText>Released: {game.released}</CardText>
        <CardText>Rating: {game.rating}/{game.rating_top}</CardText>
        <CardText>{(game.genres).map(genre => genre.name).join(', ')}</CardText>
        <Button className={`card-btn ${backlog ? 'card-btn-true': 'card-btn-false'}`} onClick={() => setBacklog(!backlog)}>Button</Button>
      </CardBody>
    </Card>
  );
};

export default GameCard;