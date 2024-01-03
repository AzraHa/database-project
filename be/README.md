# Database project backend

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)

## Installation

```bash
# Clone the repository
git clone https://github.com/AzraHa/database-project

# Navigate to the project directory
cd be

# Install dependencies
yarn
```

## Folder structure

```arduino
/be
│
├── database
│── routes/
│   ├── employees
│   ├── reports
│   └── orders
└── index.js
````

## Dependencies

```
Express: Web application framework for Node.js.
body-parser: Middleware to parse incoming request bodies in a middleware before your handlers.
cors: Middleware to enable Cross-Origin Resource Sharing (CORS) in your Express app.
dotenv: Zero-dependency module that loads environment variables from a .env file into process.env.
mysql2:  MySQL library for Node.js. It's a fast and reliable MySQL driver.
nodemon: Utility that monitors for changes in your source code and automatically restarts your server
```
