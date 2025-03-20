import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model('Sale', saleSchema);
