import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL is not defined in the environment variables.')
}

console.log('Connecting to MongoDB...')

mongoose.connect(process.env.MONGO_URL)