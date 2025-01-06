import mongoose from "mongoose";

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL is not defined in the environment variables.')
}

console.log('Connecting to MongoDB...')

mongoose.connect(process.env.MONGO_URL)

const connectToDB = async (retries = 5, delay = 2000): Promise<void> => {
  console.log("Connecting to MongoDB...")

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("MongoDB connection established successfully!")
      return; // Exit the function if the connection is successful
    } catch (error) {
      console.log(`Attempt ${attempt} to connect to MongoDB failed: ${error}`)
      
      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      } else {
        console.error("All connection attempts failed. Exiting...")
        throw error; // Re-throw error after the final attempt
      }
    }
  }
}

connectToDB().catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1); // Exit the application if the connection fails
})