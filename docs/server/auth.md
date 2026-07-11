# Authentication

## Objective

Implement email/password authentication using Laravel Sanctum.

---

## APIs

POST /api/register

POST /api/login

POST /api/logout

GET /api/user

---

## Validation

Register

- name
- email
- password
- password_confirmation

Login

- email
- password

---

## Requirements

- Use Form Requests
- Use Sanctum
- Use API Resources
- Use AuthService
- Hash Passwords
- Never return passwords
- Use REST conventions
- Use proper HTTP status codes

---

## Future

- Google OAuth
- Forgot Password
- Reset Password
- Email Verification
