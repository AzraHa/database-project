import express, { json, urlencoded } from "express";
import cors from "cors";
import { router as ordersRouter } from "./routes/orders.js";
import { router as reportRouter } from "./routes/reports.js";
import { router as employeesRouter } from "./routes/employees.js";

var app = express();
const port = process.env.PORT || 3000;

app.use(json({ limit: "1gb" }));
app.use(cors());
app.use(urlencoded({ extended: false }));

app.use("/api/employees", employeesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/reports", reportRouter);

app.listen(port, () => {
  console.log(`Server sluša na http://localhost:${port}`);
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

export default app;
