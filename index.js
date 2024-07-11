const express = require("express");
const mongoose = require("mongoose");
//const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

/**
   MongoDB Credentials
   Username: johnleonardvalledor8
   Password: 0IgdN58Vu1cy78GT
   */

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", function (req, res) {
  res.send("Hello from Node API pokemon");
});

const strConn =
  "mongodb+srv://johnleonardvalledor8:0IgdN58Vu1cy78GT@backenddb.hrkvdd9.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=BackendDB";

mongoose
  .connect(strConn)
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port http://localhost:3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
