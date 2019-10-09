import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: [8, 'password length must be 8 characters or more'],
    // maxlength: 15
  },
  email: {
    type: String,
    required: true,
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