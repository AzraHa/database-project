import express from "express";
import { dbConnection } from "../database/connection.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Endpoint za poziv procedure za pospremanje baze
router.post("", (req, res) => {
  dbConnection.connect();
  dbConnection.query(
    `CALL CleanScansWithLog('${req.body.fromDate}', '${req.body.toDate}')`,
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(results[0][0].log_messages);
      }
    }
  );
});

export { router };
