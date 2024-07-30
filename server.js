import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'

const app = express();

mongoose.connect(process.env.MONGODB_URI);

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
    
});



