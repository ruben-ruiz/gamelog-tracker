const mongoose = require('mongoose');

const url = 'mongodb://localhost/games';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database is connected!');
})

module.exports = db;