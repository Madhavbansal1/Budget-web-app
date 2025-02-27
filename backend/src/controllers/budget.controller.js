import Budget from "../models/budget.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createBudget = async (req, res) => {
    try {
        const authHeader = req.headers.authorization; // Correct header path

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "No token provided");
        }

        // For now we simply extract the clerkId from token; in production, verify the token.
        const clerkId = authHeader.split(" ")[1];

        const { monthlylimit, spentAmount, categoryLimits } = req.body;

        if (!monthlylimit) {
            throw new ApiError(400, "Monthly limit is required");
        }

        // Create the budget document in the database
        const budget = await Budget.create({
            clerkId,
            monthlylimit,
            spentAmount,
            categoryLimits
        });

        return res.status(201).json(new ApiResponse(201, budget, "Budget created successfully"));
    } catch (error) {
        return res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
    }
};

export { createBudget };
