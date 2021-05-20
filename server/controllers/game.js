const Game = require('../../database/models/Game.js');

exports.getAll = (req, res) => {
  Game.find({}, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item)
  })
};

exports.add = (req, res) => {
  let newGame = new Game(req.body);

  newGame.save((err, game) => {
    if (err) {
      res.send(err);
    }
    res.end();
  })
  return;
};

exports.delete = (req, res) => {
  Game.deleteOne(req, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.end();
  })
  return;
};