
---

# Task2

## Description

This API is developed as part of a training task (for InnoFrontIT) to manage users and administrative functions with authentication. It allows operations such as user registration, login, password reset, and administrative actions including creating, reading, updating, and deleting user records.

## Features

- User Registration and Login
- Password Reset Functionality
- Admin CRUD operations on User records
- JWT-based Authentication
- Admin Role Authorization

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- JSON Web Tokens (JWT) for authentication
- nodemailer for email operations

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/shamam99/Faked.git
cd Faked
```

2. Install NPM packages:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:

```bash
npm run dev
```

## Usage

The API supports the following endpoints:

### Auth Routes

- POST `/auth/register`: Register a new user
- POST `/auth/login`: Login for existing users
- POST `/auth/forgetPassword/`: Request a password reset link
- POST `/auth/resetPassword/:token`: Reset password using token received in email

### Admin Routes

- POST `/admin/create`: Create a new user (Admin only)
- GET `/admin/get`: Get all users (Admin only)
- GET `/admin/get/:id`: Get user by ID (Admin only)
- PUT `/admin/update/:id`: Update user details (Admin only)
- POST `/admin/updatePass/:id`: Update user password (Admin only)
- DELETE `/admin/delete/:id`: Delete a user (Admin only)

### Protected Routes

These routes are protected and require JWT for access. The token must be provided in the `Authorization` header as `Bearer <token>`.

## Contributing

Please follow these steps to contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Author

shamam

