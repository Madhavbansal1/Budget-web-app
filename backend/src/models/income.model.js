import mongoose, { trusted } from "mongoose";

const incomeSchema = new mongoose.Schema({
    clerkId:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        requied: true
    },
    date:{
        type: Date,
        default:Date.now
    },
    source: {
        type:String,
        enu: ["Business","Service","FreeLance","Other"],
        required: true
    },
    isjoint: {
        type: Boolean,
        default: false
    }
})

const Income = new mongoose.model("Income",incomeSchema);
export default Income;