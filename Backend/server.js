import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import cors from "cors"
import authRouter from "./Routes/authRoutes.js"
import userRouter from "./Routes/userRoutes.js";

dotenv.config();
const app = express()
// Middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // your frontend origin
  credentials: true,
}));

// Connect to MongoDB
connectDB();

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.get("/", (req, res) => {
  res.send("API running");
});



const port = 4000

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})


