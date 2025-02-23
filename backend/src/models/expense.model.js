import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    clerkId:{
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    category:{
        type: String, 
        enum: ["food", "rent", "transportation", "entertainment", "health", "utilities", "other"], 
        required: true 
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    isjoint:{
        type: Boolean,
        default: false
    }
})

const Expense = new mongoose.model("Expense",expenseSchema);
export default Expense;