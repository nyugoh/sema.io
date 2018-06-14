import { Router } from 'express';
import User from '../models/User';
import passport from 'passport'
import local from 'passport-local';
// import flash from 'connect-flash';

const LocalStrategy = local.Strategy;
const router = Router();

// router.use(flash());
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

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);

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

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports  = router;