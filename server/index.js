require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

let ax = axios.create({
  baseURL: 'https://api.rawg.io/api',
  timeout: 1000,
  params: {
    key: process.env.RAWG_API_KEY
  }
});

// app.use(cors());
app.use(express.json());
app.use(express.static('client/public'));

app.get('/games', (req, res) => {
  ax.get('/games?search=slug')
  .then(response => {
    // console.log('success? ', response)
    res.send(response.data);
  })
  .catch(err => {
    console.log('err? ', err)
    res.send(err);
  })
});

app.listen(port, () => { console.log(`server listening on port ${port} `)});