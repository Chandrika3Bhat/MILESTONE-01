const express = require('express');

module.exports = (expenses, validCategories) => {
    const router = express.Router();

    // Add Expense Endpoint
    router.post('/', (req, res) => {
        const { category, amount, date } = req.body;

        // Validate input
        if (!validCategories.includes(category)) {
            return res.status(400).json({
                status: 'error',
                data: null,
                error: 'Invalid category.',
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                status: 'error',
                data: null,
                error: 'Amount must be a positive number.',
            });
        }

        // Add the new expense to the array
        const newExpense = {
            id: expenses.length + 1,
            category,
            amount,
            date: new Date(date).toISOString(),
        };

        expenses.push(newExpense);

        return res.status(201).json({
            status: 'success',
            data: newExpense,
            error: null,
        });
    });

    // Get Expenses Endpoint
    router.get('/', (req, res) => {
        const { category, startDate, endDate } = req.query;
        let filteredExpenses = [...expenses];

        // Filter by category if provided
        if (category) {
            filteredExpenses = filteredExpenses.filter((expense) => expense.category === category);
        }

        // Filter by date range if provided
        if (startDate || endDate) {
            filteredExpenses = filteredExpenses.filter((expense) => {
                const expenseDate = new Date(expense.date);
                return (!startDate || expenseDate >= new Date(startDate)) && (!endDate || expenseDate <= new Date(endDate));
            });
        }

        return res.status(200).json({
            status: 'success',
            data: filteredExpenses,
            error: null,
        });
    });

    // Analyze Spending Endpoint
    router.get('/analysis', (req, res) => {
        const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const categoryWise = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        return res.status(200).json({
            status: 'success',
            data: { totalSpent, categoryWise },
            error: null,
        });
    });

    return router;
};
