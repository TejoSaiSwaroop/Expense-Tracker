const express = require('express');
const Expense = require('../../models/Expense');
const auth = require('../../middleware/auth');
const router = express.Router();

// @route   POST /api/expenses
// @desc    Create a new expense
// @access  Private
router.post('/', auth, async (req, res) => {
    const { user, amount, category, description, date } = req.body;
    try {
        const newExpense = new Expense({ user, amount, category, description, date });
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/expenses
// @desc    Get all expenses
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/expenses/:id
// @desc    Get expense by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/expenses/:id
// @desc    Update an expense
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { user, amount, category, description, date } = req.body;
    const expenseFields = { user, amount, category, description, date };
    try {
        let expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { $set: expenseFields },
            { new: true }
        );
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        await expense.remove();
        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;