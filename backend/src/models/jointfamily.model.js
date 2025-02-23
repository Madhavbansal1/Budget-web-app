import mongoose from "mongoose";


const JointFamilySchema = new mongoose.Schema({
    familyName: { 
        type: String, 
        required: true 
    },
    
    members: [{ 
        type: String, 
        required: true 
    }], // Storing Clerk's `clerkId` instead of ObjectId
    totalIncome: { 
        type: Number, 
        default: 0 
    },
    totalExpenses: { 
        type: Number, 
        default: 0 
    },
    transactions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Expense" 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
  });
