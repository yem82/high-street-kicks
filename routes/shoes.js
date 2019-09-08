const router = require('express').Router();
import Shoe from '../models/shoe';

router.route('/').get((req, res) => {
  Shoe.find()
    .then(shoes => res.json(shoes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const brand = req.body.brand;
  const name = req.body.name;
  const price = Number(req.body.price);
  const size = Number(req.body.size);
  const colour = req.body.colour;
  const quantity = Number(req.body.quantity);
  const image = req.body.image;

  const newShoe = new Shoe ({
    brand,
    name,
    price,
    size,
    colour,
    quantity,
    image
  })

  newShoe.save()
    .then(() => res.json('Shoes added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

export default router;