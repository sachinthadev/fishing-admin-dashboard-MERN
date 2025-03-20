import mongoose from "mongoose";

const fishStockSchema = new mongoose.Schema({
  type: String,
  quantity: Number,
  pricePerKg: Number
});

export default mongoose.model("FishStock", fishStockSchema);
