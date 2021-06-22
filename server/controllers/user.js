const User = require('../../database/models/User.js');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client('742413594674-i998hv5n1t54g1m1pi2n3brc6cpuhpdh.apps.googleusercontent.com');

exports.googlelogin = (req, res) => {
  const {tokenId} = req.body;

  client.verifyIdToken({idToken: tokenId, audience: '742413594674-i998hv5n1t54g1m1pi2n3brc6cpuhpdh.apps.googleusercontent.com'})
  .then(response => {
    const {email_verified, name, email, picture} = response.payload;

    if (email_verified) {
      User.findOne({email}).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong..."
          })
        } else {
          if (user) {
            const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
            const {_id, name, email, picture} = user;
            req.session.userId = _id;
            res.json({
              token,
              user: {_id, name, email, picture}
            })
          } else {
            let password = email+process.env.JWT_SIGNIN_KEY;
            let newUser = new User({name, email, password, picture});
            newUser.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: "Something went wrong..."
                })
              }

              const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
              const {_id, name, email, picture} = data;
              req.session.userId = _id;
              res.json({
                token,
                user: {_id, name, email, picture}
              })
            })
          }
        }
      })
    }
  })
}

exports.getAll = (req, res) => {
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user === null) res.send('Not logged in');
    else {
      let games = user.library;
      res.json(games)
    }
  })
};

exports.getBacklog = (req, res) => {
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user === null) res.send('Not logged in');
    else {
      let games = user.library.filter((game) => game.status === 'Backlog');
      res.json(games);
    }
  })
}

exports.getPlaying = (req, res) => {
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user === null) res.send('Not logged in');
    else {
      let games = user.library.filter((game) => game.status === 'Playing');
      res.json(games);
    }
  })
}

exports.getCompleted = (req, res) => {
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user === null) res.send('Not logged in');
    else {
      let games = user.library.filter((game) => game.status === 'Completed');
      res.json(games);
    }
  })
}

exports.add = (req, res) => {
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    let newGame = req.body;
    if (err) {
      res.send(err);
    }
    if (user === null) res.send('Not logged in');
    else {
      user.library.push(newGame);
      user.save((err) => {
        if (err) res.status(400);
        res.end();
      })
    }
  })
};

exports.update = (req, res) => {
  const { id } = req.body;
  const { status } = req.body;
  let userId = req.session.userId;
  User.findById(userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user === null) res.send('Not logged in');
    else {
      let updateGame = user.library.filter((game) => game.id === id);
      updateGame[0].status = status;
      user.save((err) => {
        if (err) res.status(400);
        res.end();
      })
    }
  })
};

exports.delete = (req, res) => {
  let { id } = req.query;
  let userId = req.session.userId;

  User.updateOne({ _id: userId },
    { $pull: { library: { $in: [{ id: id }] } } })

  // User.findById(userId, (err, user) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   if (user === null) res.send('Not logged in');
  //   else {
  //     let removeGames = user.library.filter((game) => game.id === id);

  //     user.save((err) => {
  //       if (err) res.status(400);
  //       console.log('successfully deleted game');
  //       res.end();
  //     })
  //   }
  // })
};