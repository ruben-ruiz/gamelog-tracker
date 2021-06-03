require('dotenv').config();
const express = require('express');
const router = express.Router()
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;
const db = require('../database');
const game_controller = require('./controllers/game.js');

let ax = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 2000,
  params: {
    key: process.env.RAWG_API_KEY
  }
});

app.use(express.json());
app.use(cors());
// app.use(express.static('client/build'));

app.get('/api/games', (req, res) => {
  let title = req.query.query || '';
  let genre = req.query.genres || '';
  let platform = req.query.platforms || '';

  let query = `/games?`;

  if (title !== '') {
    query += `search=${title}&`;
  }

  if (genre !== '') {
    query += `genres=${genre}&`;
  }

  if (platform !== '') {
    query += `platforms=${platform}`;
  }

  ax.get(query)
  .then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log('err? ', err)
    res.send(err);
  })
});

app.get('/api/games/next', (req, res) => {
  let query = req.query.query || '';
  console.log(query);

  ax.get(query)
  .then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log('err? ', err)
    res.send(err);
  })
});

app.get('/api/library', (req, res) => {
  game_controller.getAll(req, res);
})

app.post('/api/library', (req, res) => {
  game_controller.add(req, res);
})

app.delete('/api/library', (req, res) => {
  game_controller.delete(req.query, res);
})


app.get('/api/genres', (req, res) => {
  ax.get('/genres')
  .then(response => {
    res.send((response.data).results)
  })
  .catch(err => {
    res.send(err);
  })
})

app.get('/api/platforms', (req, res) => {
  ax.get('/platforms')
  .then(response => {
    res.send((response.data).results)
  })
  .catch(err => {
    res.send(err);
  })
})

app.listen(port, () => { console.log(`server listening on port ${port} `)});