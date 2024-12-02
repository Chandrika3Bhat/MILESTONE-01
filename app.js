const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const expensesRoutes = require('./routes/expenses');

const app = express();
const port = 3000;

// In-memory data storage for expenses
let expenses = [];

// Predefined categories for validation
const validCategories = ['Food', 'Travel', 'Movie', 'Shopping', 'Bills'];

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/expenses', expensesRoutes(expenses, validCategories));

// Cron job for automated summary generation (Daily Summary)
cron.schedule('0 0 * * *', () => { // Runs every day at midnight
    generateSummary('daily');
});

// Example endpoint to verify the server is running
app.get('/', (req, res) => {
    res.send('Personal Expense Tracker API is running!');
});

// Function to generate summary (weekly or monthly)
function generateSummary(period) {
    let periodSummary = {
        period: period,
        totalSpent: 0,
        categoryWise: {},
    };

    // Summing up expenses based on period
    expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const today = new Date();

        // Filter expenses by period (daily/monthly)
        if (period === 'daily' && expenseDate.toDateString() === today.toDateString()) {
            periodSummary.totalSpent += expense.amount;
            periodSummary.categoryWise[expense.category] =
                (periodSummary.categoryWise[expense.category] || 0) + expense.amount;
        } else if (period === 'monthly' && expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear()) {
            periodSummary.totalSpent += expense.amount;
            periodSummary.categoryWise[expense.category] =
                (periodSummary.categoryWise[expense.category] || 0) + expense.amount;
        }
    });

    console.log('Generated Summary:', periodSummary);
}

app.listen(port, () => {
    console.log(`Personal Expense Tracker API is running on http://localhost:${port}`);
});
