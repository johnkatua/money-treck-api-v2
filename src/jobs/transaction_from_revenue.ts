import { addDays, addMonths, addWeeks, addYears, isAfter } from "date-fns"
import { RecurrenceInterval } from "../interface/enums"
import { IRevenue } from "../interface/revenue"
import Transaction from "../models/transaction"

const createTransactionFromRevenue = async (rev: IRevenue) => {
    const now = new Date()

    const { 
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
}