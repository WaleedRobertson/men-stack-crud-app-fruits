import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
import Fruit from "./models/fruit.js"

const app = express();

app.use(express.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODB_URI);

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});


app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

  // server.js

/* POST /fruits
// app.post("/fruits", async (req, res) => {
//     console.log(req.body);
//     //talk to the DB - through the model 
//     res.redirect("/fruits/new");
//   })*/

  // server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits/new");
  });
  
  
  

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
    
});



