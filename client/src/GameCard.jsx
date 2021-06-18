import React, {useState, useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import axios from 'axios';

const GameCard = ({game}) => {
  const [gameStatus, setGameStatus] = useState('');
  const [className, setClassName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    setStatus(game.status)
  }, [game.status])

  function setStatus (status) {
    let statusClass = 'card-btn ';

    console.log(`${game.id} ${status}`)

    if (!status || status === 'Remove') {
      setGameStatus('Add to Library');
      setClassName(statusClass);
    } else {
      statusClass += `card-btn-${status}`;
      setGameStatus(status);
      setClassName(statusClass);
    }
  }

  function changeStatus (e) {
    let selected = e.currentTarget.textContent;

    if (gameStatus === '') {
      if (selected !== 'Remove') {
        axios.post('/api/library', {
          id: game.id,
          slug: game.slug,
          name: game.name,
          released: game.released,
          background_image: game.background_image,
          rating: game.rating,
          rating_top: game.rating_top,
          genres: genres,
          status: selected
        })
        .then(setStatus(selected))
        .catch(err => console.log(err));
      } else return;
    } else if (selected === 'Remove') {
      axios.delete('/api/library', {
        params: {
          id: game.id
        }
      })
      .then(setStatus(selected))
      .catch(err => console.log(err));
    } else {
      axios.put('/api/library', {
          id: game.id,
          status: selected,
      })
      .then(setStatus(selected))
      .catch(err => console.log(err));
    }
  }

  //overwriting game.genres to be a string if it's an array
  //component is used for library and games 'search' view, stored in database as string
  //comes from API as an array
  let genres = game.genres;

  if (Array.isArray(game.genres)) {
    genres = (game.genres).map(genre => genre.name).join(', ');
  }

  return (
    <Card>
      <CardImg src={game.background_image} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{game.name}</CardTitle>
        <CardText>Released: {game.released}</CardText>
        <CardText>Rating: {game.rating}/{game.rating_top}</CardText>
        <CardText>{genres}</CardText>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="up">
          <DropdownToggle caret className={className}>{gameStatus}</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={(e) => changeStatus(e)}>Backlog</DropdownItem>
            <DropdownItem onClick={(e) => changeStatus(e)}>Playing</DropdownItem>
            <DropdownItem onClick={(e) => changeStatus(e)}>Completed</DropdownItem>
            {
              gameStatus !== 'Add to Library' ?
              <DropdownItem onClick={(e) => changeStatus(e)}>Remove</DropdownItem> :
              <></>
            }
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  );
};

export default GameCard;