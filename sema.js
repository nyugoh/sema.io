import express from 'express';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static('public'));

app.use('*', (req, res, next) => {
  console.log(req.url);
  next();
});

app.get('/', (req, res)=> {
  res.json({message: "Hello sema.io" });
});

app.get('/login', (req, res) =>{
  res.render("login");
});

app.listen(process.env.PORT, () => {
  console.log("App running on port ", process.env.PORT);
});

exports.default = app;