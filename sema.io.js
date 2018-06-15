import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import connectMongo from 'connect-mongo';
import users from './app/controller/user';
import * as utils from './app/utils/auth-routes';

const app = express();
dotenv.config();
let MongoStore = connectMongo(session);

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.COOKIE_SECRET,
  name: 'sama.io-auth-cookie',
  proxy: true,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 2 * 24 * 60 * 60 // 2 days
  })
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("connected")
}).catch(error =>{
  console.log(error.message)
});

app.use('/users', users);

app.get('/', utils.isAuthenticated, (req, res)=> {
  res.json({message: "Hello sema.io" });
});

app.get('/login', (req, res) =>{
  res.render("login", { message: req.flash()});
});

app.get('/signin', (req, res) =>{
  res.render("signin", { message: req.flash()});
});

app.get('/logout', (req, res) =>{
  req.logout();
  res.redirect('/login');
});

app.listen(process.env.PORT, () => {
  console.log("App running on port ", process.env.PORT);
});

exports.default = app;