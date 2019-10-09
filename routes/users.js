import User from '../models/user';
import bcrypt from 'bcryptjs';
const router = require('express').Router();

router.get('/', (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      res.json({ err })
    } else {
      const user = new User ({
        name: req.body.name,
        password: hash,
        password2: req.body.password2,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
      });
      user.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});

router.post('/login', (req, res) => {
  res.render('/login')
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  User.findById(req.params.id)
  .then((user) =>
  { bcrypt.hash(req.body.password, 10, (err, hash) => {
    if(err) {
      res.json({ err })
    } else {
    user.name = req.body.name;
    user.password = hash;
    user.password2 = req.body.password2;
    user.email = req.body.email;
    user.address = req.body.address;
    user.phone = req.body.phone;

    user.save()
      .then(() => res.json('User updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    })
  });
});

export default router;