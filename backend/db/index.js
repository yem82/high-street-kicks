import mongoose from 'mongoose';
import 'dotenv/config';

const connectMongoDB = () => {
  const uri = process.env.ATLAS_URI_DEV

  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
  );
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('You have connected with MongoDB database');
  }).on('error', (err) => {
    console.log('Error is: ', err);
  });
}

export default connectMongoDB;