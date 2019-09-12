// import User from '../models/user';
// import bcrypt from 'bcryptjs';
// const router = require('express').Router();

// router.get('/', (req, res) => {
//   User.find()
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.post('/register', (req, res) => {
//   const name = req.body.name;
//   const password = req.body.password;
//   const password2 = req.body.password2;
//   const email = req.body.email;
//   const address = req.body.address;
//   const phone = Number(req.body.phone);

//   const newUser = new User ({
//     name,
//     password,
//     password2,
//     email,
//     address,
//     phone
//   });

//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newUser.password), salt, (err, hash) => {
//       newUser.password = hash;
//       newUser.save()
//       .then(() => res.json('User added!'))
//       .catch(err => res.status(400).json('Error: ' + err));
//       res.redirect('/users/login');
//     };
//   })
// });

// router.post('/login', (req, res) => {
//   res.render('/login')
// });

// router.get('/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.json(user))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.delete('/:id', (req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => res.json('User deleted!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.post('/update/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then((user) => {
//     user.name = req.body.name;
//     user.password = req.body.password;
//     user.password2 = req.body.password2;
//     user.email = req.body.email;
//     user.address = req.body.address;
//     user.phone = req.body.phone;

//     user.save()
//       .then(() => res.json('User updated!'))
//       .catch(err => res.status(400).json('Error: ' + err));
//     })
//     .catch(err => res.status(400).json('Error: ' + err));
// });


// export default router;