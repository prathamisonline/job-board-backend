Job Board Backend

This project is a backend system for a job board application. It is built using Node.js and MySQL, and includes APIs to manage jobs, users, and other related features.

Setup and Installation

Clone the Repository:

git clone https://github.com/your-username/job-board-backend.git
cd job-board-backend

Install Dependencies:
Make sure you have Node.js and npm installed. Then, run:

npm install

Set Up the Environment Variables:
Create a .env file in the root of your project and add the following variables:

DB_HOST=localhost
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306
PORT=3001

Run the Database Migrations:
Ensure your MySQL server is running and that you have created the database specified in the .env file. Then execute any migration scripts if available.

Start the Server:

npm start

The server will run at http://localhost:3001 by default.

For Swagger

http://localhost:3001/api-docs