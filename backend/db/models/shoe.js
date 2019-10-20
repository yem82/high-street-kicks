import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  colour: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    data: Buffer,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
  timestamps: true
});

const Shoe = mongoose.model('Shoe', shoeSchema);

export default Shoe;