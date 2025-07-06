import mongoose from "mongoose";
import { config } from "../config";

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000;

export async function connectDB(retryCount = 0): Promise<void> {
  try {
    await mongoose.connect(config.mongodb.uri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error(
      `Failed to connect to MongoDB (attempt ${
        retryCount + 1
      }/${MAX_RETRIES}):`,
      error
    );

    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_INTERVAL / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL));
      return connectDB(retryCount + 1);
    }

    throw new Error("Failed to connect to MongoDB after maximum retries");
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});
