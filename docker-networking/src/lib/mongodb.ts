import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "dateDB";

export async function connectToMongo() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function closeMongoConnection() {
  await client.close();
}
