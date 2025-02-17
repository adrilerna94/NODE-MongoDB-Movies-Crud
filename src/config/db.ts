// Handles database connection and configuration.
// This file is responsible for setting up and exporting the database instance.

import mongoose, { type ConnectOptions } from 'mongoose';
import { DATABASE_URL } from './config';

export const createConnection = async () => {
  try {
    const options: ConnectOptions = {};

    if (!DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    await mongoose.connect(DATABASE_URL, options);
    console.log('INFO Connected to the DB');

    mongoose.connection.on('error', (error) => {
      console.log('ERROR The connection was interrupted: ', error);
    });
  } catch (error) {
    console.log('ERROR Cannot connect to the DB: ', error);
  }
};
