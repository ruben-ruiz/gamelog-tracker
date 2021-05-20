const Game = require('../../database/models/Game.js');

exports.getAll = (req, res) => {

};

exports.add = (req, res) => {
  // console.log('ADD req.body: ', req.body);
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