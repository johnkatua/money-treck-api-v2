import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import "./cronJobs/subscriptionExpiry";
import "./db";
import budgetRouter from "./routers/budget";
import expenditureRouter from "./routers/expenditure";
import paymentRouter from "./routers/payment";
import reportRouter from "./routers/report";
import revenueRouter from "./routers/revenue";
import subscriptionRouter from "./routers/subscription";
import userRouter from "./routers/user";
import { generateMpesaToken } from "./utils/generateMpesaToken";

const app = express();

const port = process.env.PORT || 8000;

// Express Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Routes
app.use("/api/users", userRouter);
app.use("/api/revenues", revenueRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/expenses", expenditureRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reports", reportRouter);

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send('API healthcheck!')
});

(async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
      generateMpesaToken()
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
