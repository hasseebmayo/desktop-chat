import mongoose from "mongoose";

export async function DBConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Mongo DB is connected");
  } catch (error) {}
}
