import express from "express"
import dotenv from "dotenv" // require package
import mongoose from "mongoose" 
import Fruit from "./models/fruit.js"
import methodOverride from "method-override"
import logger from "morgan"

// Mount it along with our other middleware, ABOVE the routes
dotenv.config(); // Loads the environment variables from .env file
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(logger("dev")); 



mongoose.connect(process.env.MONGODB_URI);

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });
  


app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

  // GET /fruits
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.send("Welcome to the index page!");
  });

  app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });

  // GET localhost:3000/fruits/:fruitId/edit
app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    console.log(foundFruit);
    res.send(`This is the edit route for ${foundFruit.name}`);
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
    res.redirect("/fruits");
  });

  app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.send(
      `This route renders the show page for fruit id: ${req.params.fruitId}!`
    );
  });

  // server.js

app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });
  
  
  
  
  

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
    
});



