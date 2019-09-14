import bcrypt from 'bcryptjs';
import Shoe from '../../models/shoe';
import User from '../../models/user';
import Order from '../../models/order';


export default {
  orders: async () => {
    try {
      const orders = await Order.find()
      return orders.map(order => {
        return { ...order._doc,
          user: user.bind(this, order._doc.user),
          shoe: selectShoe.bind(this, order._doc.shoe),
          createdAt: new Date(order._doc.createdAt).toISOString(),
          updatedAt: new Date(order._doc.updatedAt).toISOString()
        }
     })
    }
    catch(err) {throw err};

  },
  shoes: async () => {
    try {
      const shoes = await Shoe.find()
      return shoes.map(shoe => {
        return { ...shoe._doc,
        owner: user.bind(this, shoe.owner) }
     })
    }
    catch(err) {throw err};
  },
  users: async () => {
    try { const users = await User.find()
      return users.map(user => {
        return {...user._doc}
     })
    }
    catch(err) {throw err}
  },
  createShoe: (args) => {
    const shoe = new Shoe({
      brand: args.shoeInput.brand,
      name: args.shoeInput.name,
      description: args.shoeInput.description,
      colour: args.shoeInput.colour,
      quantity: +args.shoeInput.quantity,
      price: +args.shoeInput.price,
      size: +args.shoeInput.size,
      image: args.shoeInput.image
    })
    return shoe
      .save()
      .then(result => {
        console.log(result);
        return {...result._doc,
          createdAt: new Date(result._doc.createdAt).toISOString(),
          updatedAt: new Date(result._doc.updatedAt).toISOString()};
    }).catch(err => {
        console.log(err);
        throw err;
    });
  },

  createUser: (args) => {
    bcrypt
      .hash(args.userInput.password, 12)
      .then(hashedPassword => {
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: hashedPassword,
          address: args.userInput.address,
          phone: args.userInput.phone
        });
        return user.save()
      })
      .then(result => {
        console.log(result);
        return {...result._doc, password: null,
          createdAt: new Date(result._doc.createdAt).toISOString(),
          updatedAt: new Date(result._doc.updatedAt).toISOString()};
    }).catch(err => {
        console.log(err);
        throw err;
    });
  },
  createOrder: async args => {
    const fetchedShoe = await Shoe.findOne();
    const order = new Order({
      user: "5d7ad6a0ce43ad9294314323",
      shoe: fetchedShoe
    })

    const result = await order.save();

    return { ...result._doc,
      user: user.bind(this, result._doc.user),
      shoe: selectShoe.bind(this, result._doc.shoe),
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString()
    }
  },
}

const selectShoe = async shoeId => {
  try {
    const shoe = await Shoe.findById(shoeId);
    return {
      ...shoe._doc,
      owner: user.bind(this, shoe.owner)
    };
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdOrders: shoes.bind(this, user._doc.createdOrders)
    };
  } catch (err) {
    throw err;
  }
};

const shoes = async shoeIds => {
  try {
    const shoes = await Shoe.find({ _id: { $in: shoeIds } });
    shoes.map(shoe => {
      return {
        ...shoe._doc,
        owner: user.bind(this, shoe.owner)
      };
    });
    return shoes;
  } catch (err) {
    throw err;
  }
};