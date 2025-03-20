import express from "express";
import FishStock from "../models/FishStock.js";

const router = express.Router();



router.post("/", async (req, res) => {
    try {
      const { type, quantity, pricePerKg } = req.body;
      const newStock = new FishStock({ type, quantity, pricePerKg });
      await newStock.save();
      res.status(201).json({ message: "Fish stock added", stock: newStock });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

// Get all fish stock
router.get("/", async (req, res) => {
  try {
    const stocks = await FishStock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
