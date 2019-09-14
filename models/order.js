import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    shoe: {
      type: Schema.Types.ObjectId,
      ref: 'Shoe'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  });

const Order = mongoose.model('Order', orderSchema);

export default Order;