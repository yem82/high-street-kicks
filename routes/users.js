const router = require('express').Router();
import User from '../models/user';

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const address = req.body.address;
  const phone = Number(req.body.phone);

  const newUser = new User ({
    name,
    password,
    email,
    address,
    phone
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

export default router;