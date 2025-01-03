import express, { Request, Response } from "express";
import userRouter from "./routers/user";
import "./db";

const app = express();

const port = process.env.PORT || 8000;

// Express Middlewares
app.use(express.json())
app.use("/api/users", userRouter)

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send('API healthcheck!')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})