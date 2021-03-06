import { Router } from 'express';
import User from '../models/User';
import passport from 'passport'
import local from 'passport-local';
import facebook from 'passport-facebook';
import twitter from 'passport-twitter';
import dotenv from 'dotenv';

const LocalStrategy = local.Strategy;
const FacebookStrategy = facebook.Strategy;
const TwitterStrategy = twitter.Strategy;
const router = Router();

dotenv.config();

router.post('/signin', (req, res) => {
  let user = new User(req.body);
  user.generateHash(req.body.password).then( hash =>{
    user.password = hash;
    user.save().then(user =>{
      if (user) {
        req.flash('message', 'Account created successfully');
        res.redirect('/login');
      }
    }).catch(error =>{
      if( error.message.indexOf('duplicate') !== -1)
        req.flash('error', 'Email/username already taken');
      res.redirect('/signin');
    })
  }).catch(error =>{
    req.flash('error', error.message);
    res.redirect('/signin');
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/auth/twitter/callback', passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' }));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function (username, password, done) {
  User.findOne({email: username}, (error, user) => {
    if (error)
      return done(error);
    if (!user)
      return done(null, false, { message: 'Incorrect username/email' });
    user.compareHash(user.password, password).then( isMatch => {
      if (!isMatch)
        return done(null, false, { message: 'Incorrect password'});
      return done(null, user);
    })
  });
}));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_KEY,
    clientSecret: process.env.FACEBOOK_SECRETE,
    callbackURL: `${process.env.BASE_URL}/users/auth/facebook/callback`
  }, function(accessToken, refreshToken, profile, done) {
    User.find({ providerId: profile.id}).then(user =>{
      user = user[0];
      if (user)
        return done(null, user);
    })
    let user = new User({
      providerId: profile.id,
    });
    user.save().then(user =>{
      if (user)
        return done(null, user);
    }).catch( err => {
      return done(null, false, { message: err.message });
    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRETE,
    callbackURL: `${process.env.BASE_URL}/users/auth/twitter/callback`
  }, function(token, tokenSecrete, profile, done) {
    User.find({ providerId: profile.id}).then(user =>{
      user = user[0];
      if (user)
        return done(null, user);
    })
    let user = new User({
      providerId: profile.id,
      username: profile.username,
      profile: profile.photos[0].value
    });
    user.save().then(user =>{
      if (user)
        return done(null, user);
    }).catch( err => {
      return done(null, false, { message: err.message });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports  = router;