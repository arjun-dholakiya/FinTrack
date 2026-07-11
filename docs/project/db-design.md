# Database Design

## Tables

- users
- categories
- transactions
- budgets
- goals

---

# Relationships

User

- hasMany Categories
- hasMany Transactions
- hasMany Budgets
- hasMany Goals

Category

- belongsTo User
- hasMany Transactions
- hasMany Budgets

Transaction

- belongsTo User
- belongsTo Category

Budget

- belongsTo User
- belongsTo Category

Goal

- belongsTo User

---

# Business Rules

## Categories

- Category type can be
   - income
   - expense

- Users can create custom categories.

---

## Transactions

- Every transaction belongs to one user.
- Every transaction belongs to one category.
- Transaction amount must be positive.
- Category determines whether the transaction is income or expense.

---

## Budgets

- Budgets are monthly.
- Budgets only exist for expense categories.
- One budget per category per month.
- Remaining budget is calculated.
- Budget progress is calculated.

---

## Goals

- Every goal belongs to one user.
- Goals contain target amount.
- Goals contain current amount.
- Goal status is calculated in code.
- No status column in database.

---

# Important Notes

- Never modify relationships unless explicitly requested.
- Keep database normalized.
- Use foreign keys.
- Use indexes.
- Follow PostgreSQL best practices.
