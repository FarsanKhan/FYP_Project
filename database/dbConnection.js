import mongoose from "mongoose";

export const dbConnection = () => {
  console.log('process.env.MONGO_URI :>> ', process.env.MONGO_URI);
  mongoose
    .connect('mongodb+srv://jobseeker:jobseeker@cluster0.y1glntk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
