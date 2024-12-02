const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const expensesRoutes = require('./routes/expenses');

const app = express();
const port = 3000;

let expenses = [];

const validCategories = ['Food', 'Travel', 'Movie', 'Shopping', 'Bills'];


app.use(bodyParser.json());


app.use('/expenses', expensesRoutes(expenses, validCategories));

cron.schedule('0 0 * * *', () => { 
    generateSummary('daily');
});

app.get('/', (req, res) => {
    res.send('Personal Expense Tracker API is running!');
});

function generateSummary(period) {
    let periodSummary = {
        period: period,
        totalSpent: 0,
        categoryWise: {},
    };

    expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        const today = new Date();

    
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
