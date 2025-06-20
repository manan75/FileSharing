import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

dotenv.config();
const app = express()
// Middleware
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API running");
});

// Connect to MongoDB
connectDB();

const port = 4000

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})


