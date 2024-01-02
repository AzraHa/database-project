import express from "express";
import pkg from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const { json } = pkg;
const app = express();
const port = 3000;

app.use(json());
app.use(cors());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post("/api/orders", (req, res) => {
  const orderHeader = req.body.orderHeader;
  const orderItems = req.body.orderItems;
  res.json({ message: "Narudžba uspešno primljena", orderHeader, orderItems });
});

// Endpoint za dobijanje svih zaposlenika
app.get("/api/employees", (req, res) => {
  pool.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// Endpoint za brisanje pojedinačnog zaposlenika po ID-u
app.delete("/api/employees/:id", (req, res) => {
  pool.query(
    `DELETE FROM employees where id = ${req.params.id}`,
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(results);
      }
    }
  );
});

// Endpoint za dodavanje novog zaposlenika
app.post("/api/employees", (req, res) => {
  pool.query(
    `INSERT INTO employees (employee_code, employee_name, role) VALUES ('${req.body.employee_code}', '${req.body.employee_name}', '${req.body.role}')`,
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(results);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server sluša na http://localhost:${port}`);
});
