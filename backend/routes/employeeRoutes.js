import express from 'express';
import Employee from '../models/Employee.js';
const router = express.Router();

// Create Employee (POST)
router.post('/employee', async (req, res) => {
  try {
    const { name, status } = req.body;
    const newEmployee = new Employee({ name, status });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error creating employee', error: err.message });
  }
});

// Get all Employees (GET)
router.get('/employee', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err.message });
  }
});

// Get a single Employee by ID (GET)
router.get('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee', error: err.message });
  }
});

// Update Employee (PUT)
router.put('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, status },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Error updating employee', error: err.message });
  }
});

// Delete Employee (DELETE)
router.delete('/employee/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting employee', error: err.message });
  }
});

export default router;

