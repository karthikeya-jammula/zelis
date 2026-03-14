import mongoose from "mongoose";

export const connectDb = async (mongoUri) => {
  mongoose.set("strictQuery", true);

  if (mongoUri) {
    await mongoose.connect(mongoUri);
    return;
  }

  // No MONGODB_URI supplied — spin up an in-memory instance automatically.
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const memServer = await MongoMemoryServer.create();
  const uri = memServer.getUri();
  await mongoose.connect(uri);
  console.log("Using in-memory MongoDB at", uri);
};
