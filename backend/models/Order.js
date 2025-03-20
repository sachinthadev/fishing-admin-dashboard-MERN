import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  status: { type: String, required: true }, // e.g., 'Delivered', 'Pending'
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
