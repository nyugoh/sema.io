import express from 'express';
import dotenv from 'dotenv'

const app = express();
dotenv.config();

app.use(express.static('public'));

app.get('/', (req, res) =>{
  res.send("Hello Sema.io");
});

app.listen(process.env.PORT, () => {
  console.log("App running on port ", process.env.PORT);
});