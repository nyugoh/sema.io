import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import bodyParser from 'body-parser'
import users from './app/controller/user';

const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("connected")
}).catch(error =>{
  console.log(error.message)
});

app.use('/users', users);
app.get('/', (req, res)=> {
  res.json({message: "Hello sema.io" });
});

app.get('/login', (req, res) =>{
  res.render("login");
});

app.get('/signin', (req, res) =>{
  res.render("signin");
});

app.listen(process.env.PORT, () => {
  console.log("App running on port ", process.env.PORT);
});

exports.default = app;