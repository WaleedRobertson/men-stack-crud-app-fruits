import express from 'express'

const app = express();

// server.js

// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

