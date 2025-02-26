import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId : {
        type: String,
        requried: true,
        unique: true
    },// clerk id
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    imgUrl: {
        type: String
    },// image from clerk
    createdAt: {
        type: Date,
        default: Date.now
    },
    password:{
        type: string
    },
    role:{
        type: String,
        enum: ["individual","family member"],
        default: "individual"
    },
    income:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Income"
    }],
    expense: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Expense"
    }],
    jointFamilyId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"JointFamily",
        default: null
    },
    budgets:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Budget"
    }]// ref from budget

},
{
    timestamps: true
}

)

const User = mongoose.model("User",userSchema)

export default User;