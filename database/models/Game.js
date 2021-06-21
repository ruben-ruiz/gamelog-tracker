const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: [true, "id required."],
  },
  slug: String,
  name: String,
  released: String,
  background_image: String,
  rating: String,
  rating_top: Number,
  genres: String,
  status: String
});

// const Game = mongoose.model('Game', gameSchema);

// module.exports = Game;

module.exports = gameSchema;