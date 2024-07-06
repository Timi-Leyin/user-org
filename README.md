# User Authentication & Organisation API

This project implements a user authentication system and organisation management using Node.js, TypeScript, and Express. The application connects to a PostgreSQL database and utilizes JWT for user authentication. Each user belongs to an organisation, and an organisation can contain multiple users.


## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Endpoints](#api-endpoints)
- [Validation](#validation)
- [Testing](#testing)

## Technologies Used

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma (ORM)
- JWT (JSON Web Tokens)
- Jest & Supertest (for testing)

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Timi-Leyin/user-org.git
   cd user-org
   ```

2. **Install Dependencies**

    ```bash
        npm install
    ```

3. **Set up Environment Variables**

- Create .env file at the root of the project
- Add the following environment variables to the .env file:

    ```txt
    NODE_ENV="******************************"
    DATABASE_URL="postgresql://root:password@localhost:111/USER-ORG"
    JWT_SECRET="123455"
    ```

_USE APPROPRAITE VALUES_

4. **Run Migrations**

    ```bash
    npm run db:migrate
    ```

5. **Start Development Server**

    ```bash
    npm run dev
    ```

6. **Start Production Server**

    ```bash
    npm run build
    npm start
    ```

7. **Run Test**

    ```bash
    npm run test
    ```

or

```bash
npm test:watch
```

## Api Endpoints
- [Postman Documentation](https://www.postman.com/planetary-sunset-57477/workspace/pub/collection/26357022-3e7a00f7-8c04-4ec0-9e61-7f4473e81036?action=share&creator=26357022)



## Validation

**All fields are validated according to the following rules:**

userId and email must be unique.
firstName, lastName, email, and password are required and must not be null.
phone is optional.

## Testing
### Unit Testing
**Unit tests cover the following:**

Token generation: Ensure the token expires at the correct time and contains the correct user details.
Organisation access: Ensure users cannot see data from organisations they do not have access to.

## End-to-End Testing
End-to-end tests for the /auth/register endpoint cover the following scenarios:

Successful user registration with a default organisation.
Validation errors for missing required fields.
Database constraints for duplicate email or user ID.

**To Run test use the command below**
```bash
npm run test
```