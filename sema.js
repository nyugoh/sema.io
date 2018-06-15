import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'connect-flash';
import users from './app/controller/user';

const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.COOKIE_SECRET,
  name: 'sama.io-auth-cookie',
  proxy: true,
  resave: true,
  saveUninitialized: true
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

app.get('/', (req, res)=> {
  res.json({message: "Hello sema.io" });
});

app.get('/login', (req, res) =>{
  res.render("login", { message: req.flash()});
});

app.get('/signin', (req, res) =>{
  res.render("signin", { message: req.flash()});
});

app.listen(process.env.PORT, () => {
  console.log("App running on port ", process.env.PORT);
});

exports.default = app;