# Development Guidelines

## Purpose

This document defines the coding standards, architecture, and best practices for the FinTrack backend. Every new feature must follow these guidelines.

---

# General Principles

- Write clean, readable, and maintainable code.
- Follow SOLID principles where appropriate.
- Prefer simplicity over unnecessary abstraction.
- Avoid duplicate code.
- Keep business logic out of controllers.
- Use dependency injection whenever possible.

---

# Project Architecture

The backend follows a layered architecture.

Controller
↓

Form Request (Validation)
↓

Service (Business Logic)
↓

Model (Database)

Controllers should never contain business logic.

---

# Folder Structure

app/

├── Http/
│ ├── Controllers/
│ ├── Requests/
│ └── Resources/
│
├── Models/
│
├── Services/
│
└── Providers/

---

# Controllers

Controllers should:

- Receive HTTP requests.
- Call Form Requests for validation.
- Delegate business logic to Services.
- Return API Resources.

Controllers should NOT:

- Query the database directly.
- Contain complex logic.
- Perform calculations.

---

# Form Requests

Every POST, PUT, and PATCH endpoint must use a Form Request.

Never validate directly inside controllers.

Example:

RegisterRequest

LoginRequest

TransactionRequest

BudgetRequest

GoalRequest

---

# Services

Business logic belongs inside Services.

Examples:

AuthService

TransactionService

BudgetService

GoalService

Service responsibilities:

- Create records
- Update records
- Delete records
- Perform calculations
- Handle business rules

---

# Models

Models should only contain:

- Relationships
- Fillable fields
- Attribute casting
- Query scopes (when useful)

Avoid putting business logic inside models.

---

# API Resources

Always use API Resources for responses.

Never return Eloquent models directly.

Example:

UserResource

TransactionResource

BudgetResource

GoalResource

---

# Database

- PostgreSQL
- Foreign keys required
- Proper indexes
- Normalized schema
- No schema changes unless explicitly requested

---

# Authentication

Use Laravel Sanctum.

Passwords must be hashed using Hash::make().

Protected routes must use Sanctum middleware.

---

# Validation

Always validate requests.

Use custom validation messages when appropriate.

Return proper validation responses.

---

# Error Handling

Use proper HTTP status codes.

200 OK

201 Created

204 No Content

401 Unauthorized

403 Forbidden

404 Not Found

422 Validation Error

500 Internal Server Error

Never expose internal exceptions to clients.

---

# API Design

Follow REST conventions.

Examples:

GET /api/categories

POST /api/categories

GET /api/categories/{id}

PUT /api/categories/{id}

DELETE /api/categories/{id}

---

# Naming Conventions

Classes

PascalCase

Example:

TransactionService

Variables

camelCase

Database

snake_case

Tables

Plural

Example:

users

transactions

budgets

Columns

snake_case

Example:

created_at

target_amount

transaction_date

---

# Code Quality

- Small methods
- Meaningful variable names
- Avoid nested if statements
- Prefer early returns
- Write self-documenting code

---

# Security

- Never expose passwords.
- Never trust client input.
- Validate every request.
- Use mass assignment protection.
- Use authorization where required.

---

# Performance

- Prevent N+1 queries.
- Use eager loading.
- Paginate large datasets.
- Select only required columns.

---

# AI Rules

When generating code:

- Follow Laravel best practices.
- Follow PSR-12 coding standards.
- Never change the database schema without approval.
- Never rename database columns.
- Never remove existing APIs.
- Generate production-ready code.
- Explain important architectural decisions.
- If requirements are unclear, ask for clarification instead of making assumptions.
