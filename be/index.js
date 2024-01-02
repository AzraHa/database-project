import express from "express";
import pkg from "body-parser";

const { json } = pkg;
const app = express();
const port = 3000;

app.use(json());

app.post("/api/orders", (req, res) => {
  const orderHeader = req.body.orderHeader;
  const orderItems = req.body.orderItems;
  res.json({ message: "Narudžba uspešno primljena", orderHeader, orderItems });
});

// Endpoint za dobijanje svih zaposlenika
app.get("/api/employees", (req, res) => {
  res.json(employees);
});

// Endpoint za dobijanje pojedinačnog zaposlenika po ID-u
app.get("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = employees.find((emp) => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({ message: "Zaposlenik nije pronađen" });
  }

  res.json(employee);
});

// Endpoint za dodavanje novog zaposlenika
app.post("/api/employees", (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);

  res.status(201).json(newEmployee);
});

// Endpoint za brisanje zaposlenika po ID-u
app.delete("/api/employees/:id", (req, res) => {
  const employeeId = parseInt(req.params.id);
  employees = employees.filter((emp) => emp.id !== employeeId);

  res.json({ message: "Zaposlenik uspešno obrisan" });
});

app.listen(port, () => {
  console.log(`Server sluša na http://localhost:${port}`);
});
