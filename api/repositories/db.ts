import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("Db is connected");
    })
    .catch((err) => console.log(err.message));
