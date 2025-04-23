import express from "express";
import Fruit from "../models/fruit.mjs";
const router = express.Router()

// Get all fruits - Index
router.get("/", async (req, res) => {
    try {
      const fruits = await Fruit.find();
      res.json(fruits);
    } catch (error) {
      console.log(err);
    }
})

// SEED the route(database)
router.get("/seed", async (req, res) => {
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

// GET one fruit by its ID - Show
router.get("/:id", async (req, res) => {
  try {
    const fruit = await Fruit.findById(req.params.id);

    res.json(fruit);
  } catch (err) {
    console.log(err);
  }
});

// DELETE - Delete one fruit by id
router.delete("/:id", async(req, res) => {
    try {
      await Fruit.findByIdAndDelete(req.params.id);
      res.redirect("/fruits");
    } catch (err) {
      console.log(err);
    }
})

// Update - Update an existing fruit by id
router.put("/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      //if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true; //do some data correction
    } else {
      //if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false; //do some data correction
    }
    // fruits.push(req.body);
    await Fruit.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/fruits");
  } catch (error) {
    console.log(error);
  }
});

// POST Create a new fruit - Create
router.post("/", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }

    await Fruit.create(req.body);
    res.redirect("/fruits")
  } catch (err) {
    console.log(err);
  }
});

export default router;
