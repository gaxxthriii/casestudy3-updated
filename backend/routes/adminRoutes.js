// 
const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const Employee = require('../model/empData');

// Get all employees
router.get('/allemps', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// Add a new employee
router.post('/addemp', verifyToken, verifyAdmin, async (req, res) => {
    try {
        console.log("Request body:", req.body);
        const newEmp = new Employee(req.body);
        await newEmp.save();
        res.status(200).send({ message: "Employee added successfully" });
    } catch (error) {
        console.error("Error saving employee:", error);
        res.status(500).send({ message: "Failed to add employee", error: error.message });
    }
});

// Edit employee details
router.put('/edit/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndUpdate(id, req.body, { new: true }); // Optional: { new: true }
        res.status(200).send({ message: "Employee updated" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to update the employee" });
    }
});

// Delete employee
router.delete('/delete/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndDelete(id);
        res.status(200).send({ message: "Employee deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to delete the employee" });
    }
});

module.exports = router;
