// NO LONGER IN USE - now a subdocument of userSchema

// const Game = require('../../database/models/Game.js');

// exports.getAll = (req, res) => {
//   Game.find({}, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(item)
//   })
// };

// exports.getBacklog = (req, res) => {
//   Game.find({status: 'Backlog'}, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(item);
//   })
// }

// exports.getPlaying = (req, res) => {
//   Game.find({status: 'Playing'}, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(item);
//   })
// }

// exports.getCompleted = (req, res) => {
//   Game.find({status: 'Completed'}, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(item);
//   })
// }

// exports.add = (req, res) => {
//   let newGame = new Game(req.body);

//   newGame.save((err, game) => {
//     if (err) {
//       console.log(err);
//       res.send(err);
//     }
//     res.end();
//   })
//   return;
// };

// exports.update = (req, res) => {
//   const { id } = req.body;
//   const { status } = req.body;

//   Game.updateOne({ id: id }, { status: status }, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.end();
//   })
//   return;
// };

// exports.delete = (req, res) => {
//   Game.deleteOne(req, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.end();
//   })
//   return;
// };