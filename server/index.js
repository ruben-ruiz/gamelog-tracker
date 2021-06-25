require('dotenv').config();
const express = require('express');
const router = express.Router()
const session = require('express-session');
const cors = require('cors');
const axios = require('axios');
const app = express();
const path = require('path');
const db = require('../database');
const user_controller = require('./controllers/user.js');

let ax = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 2000,
  params: {
    key: process.env.RAWG_API_KEY
  }
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

// session
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: true,
    secure: false,
    path: '/'
  }
}));

app.post('/api/googlelogin', (req, res) => {
  user_controller.googlelogin(req, res);
})

app.delete('/api/googlelogout', async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.send('Logged out successfully');
})

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

  ax.get(query)
  .then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log('err? ', err)
    res.send(err);
  })
});

app.post('/api/library', (req, res) => {
  user_controller.add(req, res);
})

app.put('/api/library', (req, res) => {;
  user_controller.update(req, res);
})

app.delete('/api/library', (req, res) => {
  user_controller.delete(req, res);
})

app.get('/api/library/:status', (req, res) => {
  let status = req.params.status || 'getAll';
  user_controller[status](req, res);
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

// for Heroku Deployment
app.get("*", (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  if (!url.startsWith('/app/')) // since we're on local windows
    url = url.substring(1);
  res.sendFile(url);
});

app.listen(process.env.PORT, () => { console.log(`server listening on port ${process.env.PORT} `)});