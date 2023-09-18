import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

export async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;

import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     console.log(process.env.MONGO_URL);
//     mongoose.connect(process.env.MONGO_URL!);

//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("Connected to mongo");
//       console.table(["Connected", "to", "Mongo"]);
//     });

//     connection.on("error", (err) => {
//       console.log("Error connecting to MongoDB connection error. " + err);
//       process.exit();
//     });
//   } catch (error) {
//     console.log("There was an error connecting to the DB", error);
//   }
// };
// export default connectDB;
