import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import fishStockRoutes from "./routes/fishStockRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


  app.use("/api/users", userRoutes);
  app.use("/api/fishstock", fishStockRoutes);


  app.use('/api', employeeRoutes);
  app.use('/api', saleRoutes);
  app.use('/api', orderRoutes);
  app.use('/api', dashboardRoutes);

// Simple API Test
app.get("/", (req, res) => {
  res.send("Fishing Admin Dashboard API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
