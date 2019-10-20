import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
  },
  // createdOrders: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Shoe'
  //   }
  // ]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;