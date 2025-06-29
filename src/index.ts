import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import "./cronJobs/subscriptionExpiry";
import "./db";
import { startCreateTransactionsFromRecurringJob } from "./jobs/transaction_from_revenue";
import { errorHandler } from "./middleware/error_handler";
import budgetRouter from "./routers/budget";
import categoryRouter from "./routers/category";
import challengeRouter from "./routers/challenge";
import expenditureRouter from "./routers/expenditure";
import paymentRouter from "./routers/payment";
import planRouter from "./routers/plan";
import reportRouter from "./routers/report";
import revenueRouter from "./routers/revenue";
import subscriptionRouter from "./routers/subscription";
import userRouter from "./routers/user";

const app = express();

const port = process.env.PORT || 8000;

// Express Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(errorHandler)

// Routes
app.use("/api/users", userRouter);
app.use("/api/revenues", revenueRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/expenses", expenditureRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reports", reportRouter);
app.use("/api/plans", planRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/challenges", challengeRouter);

app.get("/healthcheck", (_req: Request, res: Response) => {
  res.send('API healthcheck!')
});

(async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();

// Run background jobs
startCreateTransactionsFromRecurringJob()
