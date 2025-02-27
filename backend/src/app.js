import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// create a express app
const app = express();

// other middleware setup
app.use(morgan("dev"))

app.use(cors({
    origin:"*",
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());
app.use(express.static("public"));


//import routes
import userRoute from "./routes/user.route.js"


// route declaration
app.use("/user",userRoute);

export default app;