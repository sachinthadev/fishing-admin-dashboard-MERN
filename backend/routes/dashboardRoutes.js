import express from 'express';
import FishStock from '../models/FishStock.js';
import Order from '../models/Order.js';
import Employee from '../models/Employee.js';
import Sale from '../models/Sale.js';

const router = express.Router();

// Get dashboard summary
router.get('/dashboard-summary', async (req, res) => {
  try {
    // Total Sales
    const salesDaily = await Sale.aggregate([
      { $match: { date: { $gte: new Date(new Date().setDate(new Date().getDate() - 1)) } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const salesWeekly = await Sale.aggregate([
      { $match: { date: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const salesMonthly = await Sale.aggregate([
      { $match: { date: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Total Orders & Deliveries
    const totalOrders = await Order.countDocuments();
    const totalDeliveries = await Order.countDocuments({ status: 'Delivered' });

    // Inventory Status
    const fishInventory = await FishStock.aggregate([{ $group: { _id: null, total: { $sum: '$quantity' } } }]);
    const boatsAvailable = 10; // Static for now

    // Active Employees
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });

    // Financial Overview (example values)
    const revenue = salesMonthly.length > 0 ? salesMonthly[0].total : 0;
    const expenses = 5000; // Placeholder for expense calculation
    const profit = revenue - expenses;

    res.json({
      sales: { daily: salesDaily[0]?.total || 0, weekly: salesWeekly[0]?.total || 0, monthly: salesMonthly[0]?.total || 0 },
      orders: { total: totalOrders, deliveries: totalDeliveries },
      inventory: { fish: fishInventory[0]?.total || 0, boats: boatsAvailable },
      employees: activeEmployees,
      financials: { revenue, expenses, profit },
    });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

export default router;
