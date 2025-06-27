import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      // dbName: 'SmartFitPro'
      dbName: 'mernChatApp'
    });
    console.log('DB_Connected...');
  } catch (error) {
    console.error('error', error);
  }
};

export { connect_db, mongoose };