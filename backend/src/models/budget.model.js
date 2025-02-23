import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    clerkId : {
        type: String,
        required: true
    },
    monthlylimit: {
        type: Number,
        require: true,
        default: 0
    },
    spentAmount: { 
        type: Number, 
        default: 0 
    },
    categoryLimits: {
        food: { 
            type: Number, 
            default: 0 
        },
        rent: { 
            type: Number, 
            default: 0 
        },
        transportation: { 
            type: Number, 
            default: 0 
        },
        entertainment: { 
            type: Number, 
            default: 0 
        },
        health: { 
            type: Number, 
            default: 0 
        },
        utilities: { 
            type: Number, 
            default: 0 
        },
        other: { 
            type: Number, 
            default: 0 
        }
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Budget = new mongoose.model("Budget",budgetSchema);

export default Budget;