const express = require("express");

const mongoose = require("mongoose"); 
const routes = require("./routes.js"); 


const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));



app.get("/", (req, res) => {
  res.send("working");
});


app.use("/redis", routes); 

const DATABASE_URL = 'mongodb://localhost:27017';

const PORT = 5000;

mongoose
  .connect(DATABASE_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
