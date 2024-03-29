const passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth20').Strategy,
  config = require('./environment.variables.config'),
  User = require('../models/user.model'),
  { user_not_have_email, google_oauth_error } = require('../config/error.messages.config');


module.exports.useGoogleStrategy = function() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.server.googleClientId,
        clientSecret: config.server.googleClientSecret,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (!profile._json.email) throw user_not_have_email;

          let user = await User.findOne({ email: profile._json.email });

          if (user) {
            done(null, user);
          } else {
            const newUser = { email: profile._json.email }
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          throw google_oauth_error;
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
    done(null, user);
  });
}
