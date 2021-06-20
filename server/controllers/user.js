const User = require('../../database/models/User.js');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client('742413594674-i998hv5n1t54g1m1pi2n3brc6cpuhpdh.apps.googleusercontent.com');

exports.googlelogin = (req, res) => {
  const {tokenId} = req.body;

  client.verifyIdToken({idToken: tokenId, audience: '742413594674-i998hv5n1t54g1m1pi2n3brc6cpuhpdh.apps.googleusercontent.com'})
  .then(response => {
    const {email_verified, name, email} = response.payload;

    if (email_verified) {
      User.findOne({email}).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong..."
          })
        } else {
          if (user) {
            const token = jwt.sign({_id: user._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
            const {_id, name, email} = user;

            res.json({
              token,
              user: {_id, name, email}
            })
          } else {
            let password = email+process.env.JWT_SIGNIN_KEY;
            let newUser = new User({name, email, password});
            newUser.save((err, data) => {
              if (err) {
                return res.status(400).json({
                  error: "Something went wrong..."
                })
              }

              const token = jwt.sign({_id: data._id}, process.env.JWT_SIGNIN_KEY, {expiresIn: '7d'});
              const {_id, name, email} = data;

              res.json({
                token,
                user: {_id, name, email}
              })
            })
          }
        }
      })
    }
  })
}