PolicyDash Backend
This is the backend for the PolicyDash application, built with Express, TypeScript, and MySQL.

Prerequisites
Before you can run this server, you need to have the following installed on your machine:

Node.js: Download and install the latest LTS version.

MySQL: Ensure you have a running MySQL database instance. The sql script to create the database and tables can be found in server/src/data/

Installation
Navigate to the server directory in your terminal.

Install all the project dependencies by running:

npm install

Environment Setup
This project uses environment variables to handle sensitive information like database credentials. You must create a file named .env 
in the root of the server directory.

The file should contain the following variables. Replace the placeholder values with your actual database and JWT secret information.

# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="your_database_password"
DB_DATABASE=your_database_name

# JWT Secret Key (use a long, random string)
JWT_SECRET=your_super_secret_jwt_key

Note: If your password contains special characters like #, make sure to wrap the entire value in double quotes (").

Running the Server
To start the server in development mode with live reloading, use the following command:

npm run start

The server will be running on http://localhost:3000. You can now access the API endpoints from your frontend or an API client like Postman, 
I personally use thunderclient VSCode extension.