import cron from "node-cron";
import SubscriptionModel from "../models/subscription";

cron.schedule("0 0 * * *", async () => { 
  const now = new Date();
  await SubscriptionModel.updateMany(
    { endDate: { $lt: now }, status: "Active" },
    { status: "Expired" }
  )

  console.log("Expired subscriptions updated!")
});