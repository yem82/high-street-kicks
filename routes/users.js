const router = require('express').Router();
import User from '../models/user';

router.route('/').get((req, res) => {
  User.find()
    .then(user => res.json(user))
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

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.address = req.body.address;
    user.phone = req.body.phone;

    user.save()
      .then(() => res.json('User updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


export default router;