import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/userRoute.js"
import itemRoutes from "./routes/itemRoutes.js"

import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI.replace('<db_password>',process.env.DB_PASSWORD), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch(err => console.log(err));

// Sample route
app.use("/api/users",userRouter);
app.use('/api/items', itemRoutes);
