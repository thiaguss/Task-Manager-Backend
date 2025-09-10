import mongoose from "mongoose";

const conectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.99kj33e.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster`
    );
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

export default conectToDatabase;
