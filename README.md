MILESTONE-01
Personal Expense Tracker API
The Personal Expense Tracker API helps users manage their daily expenses by allowing them to log, view, and analyze their spending patterns. This API provides insights into spending behavior and assists in making better financial decisions.
FEATURES

1. Add a new expense with details such as category, amount, and date.
2. Retrieve a summary of expenses filtered by category or date range.
3. Analyze spending patterns such as the highest spending category or monthly totals.
4. Generate automated weekly or monthly summary reports.

REQUIREMENTS:
POSTMAN.
Add Expense (POST /expenses)
STEPS:
URL:
http://localhost:3000/expenses
Method: POST
Body: 
	{ "category": "Movie", "amount": 100, "date": "2024-12-02" }
