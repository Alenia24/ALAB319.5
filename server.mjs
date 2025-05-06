import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import Fruit from "./models/fruit.mjs";

import fruits from "./routes/fruits.mjs";

const app = express();
const port = process.env.PORT || 3000;
// CORS
app.use(cors());

//for body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/fruits", fruits);
// Mongoose Connection
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to mongoDB");
});

// // mock data
// const fruits = ["apple", "banana", "pear"];

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fruits API!");
});

// SEED the route(database)
app.get("/fruits/seed", async (req, res) => {
  try {
    await Fruit.create([
      {
        name: "grapefruit",
        color: "pink",
        readyToEat: true,
      },
      {
        name: "grape",
        color: "purple",
        readyToEat: false,
      },
      {
        name: "avocado",
        color: "green",
        readyToEat: true,
      },
    ]);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

// Induces

// // Get all fruits - Index
// app.get("/fruits", async (req, res) => {
//   // res.send(fruits)
//   try {
//     const fruits = await Fruit.find();
//     res.json(fruits);
//   } catch (error) {
//     console.log(err);
//   }
// });

// New - to be handled by front end

// DELETE - Delete one fruit by id
// app.delete("/fruits/:id", async (req, res) => {
//   try {
//     await Fruit.findByIdAndDelete(req.params.id);
//     res.redirect("/fruits");
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Update - Update an existing fruit by id
// app.put("/fruits/:id", async (req, res) => {
//   try {
//     if (req.body.readyToEat === "on") {
//       //if checked, req.body.readyToEat is set to 'on'
//       req.body.readyToEat = true; //do some data correction
//     } else {
//       //if not checked, req.body.readyToEat is undefined
//       req.body.readyToEat = false; //do some data correction
//     }
//     // fruits.push(req.body);
//     await Fruit.findByIdAndUpdate(req.params.id, req.body);

//     res.redirect("/fruits");
//   } catch (error) {
//     console.log(error);
//   }
// });

// // POST Create a new fruit - Create
// app.post("/fruits", async (req, res) => {
//   try {
//     if (req.body.readyToEat === "on") {
//       req.body.readyToEat = true;
//     } else {
//       req.body.readyToEat = false;
//     }

//     await Fruit.create(req.body);
//     res.redirect("/fruits")
//   } catch (err) {
//     console.log(err);
//   }
// });

// // GET one fruit by its ID - Show
// app.get("fruits/:id", async (req, res) => {
//   try {
//     const fruit = await Fruit.findById(req.params.id);

//     res.json(fruit);
//   } catch (err) {
//     console.log(err);
//   }
// });

// App.listen
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
