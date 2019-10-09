const router = require('express').Router();
import Shoe from '../models/shoe';

router.route('/').get((req, res) => {
  Shoe.find()
    .then(shoe => res.json(shoe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const brand = req.body.brand;
  const name = req.body.name;
  const description = req.body.description;
  const price = Number(req.body.price);
  const size = Number(req.body.size);
  const colour = req.body.colour;
  const quantity = Number(req.body.quantity);
  const image = req.body.image;

  const newShoe = new Shoe ({
    brand,
    name,
    description,
    price,
    size,
    colour,
    quantity,
    image
  });

  newShoe.save()
    .then(() => res.json('Shoe added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Shoe.findById(req.params.id)
    .then(shoe => res.json(shoe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Shoe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Shoe deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Shoe.findById(req.params.id)
    .then((shoe) => {
    shoe.brand = req.body.brand;
    shoe.name = req.body.name;
    shoe.price = Number(req.body.price);
    shoe.size = Number(req.body.size);
    shoe.colour = req.body.colour;
    shoe.quantity = Number(req.body.quantity);
    shoe.image = req.body.image;

    shoe.save()
      .then(() => res.json('Shoe updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



export default router;