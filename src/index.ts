import express, { Request, Response } from "express";

const app = express();

const port = process.env.PORT || 8000;

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send('API healthcheck!')
})

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})