import express from 'express';
import Sale from '../models/Sale.js';
const router = express.Router();

// Create Sale (POST)
router.post('/sale', async (req, res) => {
  try {
    const { amount, date } = req.body;
    const newSale = new Sale({ amount, date });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).json({ message: 'Error creating sale', error: err.message });
  }
});

// Get all Sales (GET)
router.get('/sale', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales', error: err.message });
  }
});

// Get Sales within a specific date range (GET)
router.get('/sale/range', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required' });
  }

  try {
    const sales = await Sale.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales in the date range', error: err.message });
  }
});

// Get Sale by ID (GET)
router.get('/sale/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sale', error: err.message });
  }
});

// Update Sale (PUT)
router.put('/sale/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;
    const updatedSale = await Sale.findByIdAndUpdate(
      id,
      { amount, date },
      { new: true }
    );
    if (!updatedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(updatedSale);
  } catch (err) {
    res.status(500).json({ message: 'Error updating sale', error: err.message });
  }
});

// Delete Sale (DELETE)
router.delete('/sale/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await Sale.findByIdAndDelete(id);
    if (!deletedSale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json({ message: 'Sale deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting sale', error: err.message });
  }
});

export default router;
