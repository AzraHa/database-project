import express from "express";
import { dbConnection } from "../database/connection.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Endpoint za dobijanje svih zaposlenika
router.get("/", (req, res) => {
  dbConnection.connect();
  dbConnection.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// Endpoint za brisanje pojedinačnog zaposlenika po ID-u
router.delete("/:id", (req, res) => {
  dbConnection.connect();
  dbConnection.query(
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
router.post("/", (req, res) => {
  dbConnection.connect();
  dbConnection.query(
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

export { router };
