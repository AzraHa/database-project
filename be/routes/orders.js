import express from "express";
import { dbConnection } from "../database/connection.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Endpoint za prikaz svih narudzbi
router.get("", (req, res) => {
  dbConnection.connect();
  dbConnection.query(`SELECT * FROM order_details_view;`, (error, data) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(data);
    }
  });
});

// Endpoint za prijem narudžbe (zaglavlje + stavke)
router.post("", (req, res) => {
  dbConnection.connect();
  dbConnection.query(
    `CALL InsertDeliveryNote('${req.body.customerID}', '${req.body.year}', '${req.body.warehouseId}','${req.body.deliveryNoteNumber}', '${req.body.itemsData}')`,
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(data);
      }
    }
  );
});

// Endpoint za listu svih narudzbi za jednog customera u periodu
router.get("/:customerId/:dateFrom/:dateTo", (req, res) => {
  dbConnection.connect();
  dbConnection.query(
    `CALL GetOrdersByDateRange('${req.params.customerId}', '${req.params.dateFrom}', '${req.params.dateTo}')`,
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.json(data[0]);
      }
    }
  );
});

export { router };
