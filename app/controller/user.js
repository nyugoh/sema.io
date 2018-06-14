import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.post('/signin', (req, res) => {
  let user = new User(req.body);
  user.generateHash(req.body.password).then( hash =>{
    user.password = hash;
    user.save().then(user =>{
      if (user)
        res.json({status: 'Ok'});
    })
  }).catch(error =>{
    console.log(error)
    res.status(500).json({ error: error.message });
  });
});

module.exports  = router;