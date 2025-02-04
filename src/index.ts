import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import ngrok from "@ngrok/ngrok";
import userRouter from "./routers/user";
import revenueRouter from "./routers/revenue";
import budgetRouter from "./routers/budget";
import expenditureRouter from "./routers/expenditure";
import subscriptionRouter from "./routers/subscription";
import paymentRouter from "./routers/payment";
import "./db";
import "./cronJobs/subscriptionExpiry"

const app = express();

const port = process.env.PORT || 8000;
const token = process.env.NGROK_TOKEN;

(async function () {
  console.log("Initializing Ngrok tunnel...")

  const url = await ngrok.connect({
    proto: "http",
    authtoken: token,
    hostname: "money-treck",
    addr: port
  })

  console.log(`Listening on url ${url}`);
  console.log("Ngrok tunnel initialized!");
})()

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

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send('API healthcheck!')
})


app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
