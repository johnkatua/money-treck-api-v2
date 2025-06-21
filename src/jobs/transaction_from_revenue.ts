import { addDays, addMonths, addWeeks, addYears, isAfter } from "date-fns"
import cron from "node-cron"
import { RecurrenceInterval } from "../interface/enums"
import { IRevenue } from "../interface/revenue"
import Revenue from "../models/revenue"
import Transaction from "../models/transaction"

const createTransactionFromRevenue = async (rev: IRevenue) => {
    try {
        const now = new Date()

        const { 
            _id,
            recurrence_pattern, 
            start_date,
            amount,
            category_id,
            user_id,
            name,
        } = rev

        // skips any revenue which has end-date less than now
        if (recurrence_pattern?.end_date && isAfter(now, recurrence_pattern?.end_date)) {
            return
        }

        let nextDate: Date;
        switch(recurrence_pattern?.interval) {
            case RecurrenceInterval.Daily:
                nextDate = addDays(start_date, 1);
                break
            case RecurrenceInterval.Weekly:
                nextDate = addWeeks(start_date, 1);
                break
            case RecurrenceInterval.Monthly:
                nextDate = addMonths(start_date, 30)
                break
            case RecurrenceInterval.Yearly:
                nextDate = addYears(start_date, 365)
                break
            default:
                return 
        }


        // Not due yet
        if (nextDate.getTime() > now.getTime()) return;

        // Create Transaction
        await Transaction.create({
            category_id,
            user_id,
            amount,
            name,
            date: nextDate,
            type: "Revenue",
            status: "Pending",
            is_recurring: true
        })

         console.log(`Created transaction from recurring revenue: ${_id}`);
    } catch (error) {
        console.log(error)
    }   
}

export const startCreateTransactionsFromRecurringJob = () => {
    // Run daily at midnight
    cron.schedule("0 0 * * *", async () => {
        console.log("Running recurring transaction creation job...")
        const recurringRevenues = await Revenue.find({ is_recurring: true })
        for (const rev of recurringRevenues) {
            await createTransactionFromRevenue(rev)
        }
    })
}