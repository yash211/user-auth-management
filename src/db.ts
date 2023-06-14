import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Optional: Add a server selection timeout
      // Use the `indexes` option to enable automatic index creation
      // indexes: true,
    } as mongoose.ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
