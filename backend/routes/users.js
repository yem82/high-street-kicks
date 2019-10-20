import User from '../db/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    if (users) return res.status(201).json(users)
  } catch (err) {
      res.status(422).json('Error: ' + err)
  };
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) return res.status(201).json(user)
  } catch (err) {
      res.status(422).json('Error: ' + err)
  };
});

router.post('/register', (req, res) => {
  let hasErrors = false;
  let errors = [];

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    try {
      if (!req.body.name) {
        await errors.push({'Error': 'Name not received'})
        hasErrors = true;
      }
      if (!req.body.email) {
        await errors.push({'Error': 'Email not received'})
        hasErrors = true;
      }
      if (req.body.email && (req.body.email)
        .split('').filter(x => x === '@').length !== 1) {
        await errors.push('email should contain \'@\'');
        hasErrors = true;
      }
      if (req.body.email && req.body.email.indexOf('.') === -1) {
        await errors.push('email should contain at least one dot');
        hasErrors = true;
      }
      if (!req.body.password) {
        await errors.push({'Error': 'Password not received'})
        hasErrors = true;
      }
      if (req.body.password && req.body.password.length < 8) {
        await errors.push({'Error': 'Password must be at least 8 characters'})
        hasErrors = true;
      }
      if ((req.body.password !== req.body.password2)) {
        await errors.push({'Error': 'Passwords must match'})
        hasErrors = true;
      }
      if (!req.body.address) {
        await errors.push({'Error': 'Address not received'})
        hasErrors = true;
      }
      if (!req.body.phone) {
        await errors.push({'Error': 'Phone not received'})
        hasErrors = true;
      }

      if (hasErrors) {
        res.status(422).send([errors]);
      } else {
        const user = new User({
          name: req.body.name,
          password: hash,
          password2: hash,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone
        });

        await user.save()
        res.status(201).json({message: 'User added!', errors})
      }
    } catch (err) {
        res.status(422).json('Error: ' + err)
    }
  });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(401).send("email not found");

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(401).send("invalid password")

  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token);
});

router.post('/update/:id', async (req, res) => {
  try {
    const updateUser = await User.findById(req.params.id)

    bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (updateUser) {
        updateUser.name = req.body.name;
        updateUser.password = hash;
        updateUser.password2 = hash;
        updateUser.email = req.body.email;
        updateUser.address = req.body.address;
        updateUser.phone = req.body.phone;

      await updateUser.save()
      res.status(201).json('User updated!');
      }
    })
  } catch (err) {
      res.status(422).json('Error: ' + err);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (user) return res.status(201).json('User deleted!');
  } catch (err) {
    res.status(404).json('Error: ' + err);
  }
});

export default router;