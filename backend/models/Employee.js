import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true }, // 'Active', 'Inactive'
});

export default mongoose.model('Employee', employeeSchema);