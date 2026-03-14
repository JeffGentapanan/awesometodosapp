const express = require("express");
const router = express.Router();
const { getCollection } = require("./models/index");
const { ObjectId } = require("mongodb");

// GET all todos
router.get("/todos", async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

// POST a new todo
router.post("/todos", async (req, res) => {
    const collection = getCollection();
    let { todo } = req.body;

    // REMOVE OR DELETE THIS LINE:
    // todo = JSON.stringify(todo); 
 
    // Now 'todo' remains the raw string sent from your frontend
    const newTodo = await collection.insertOne({ todo, status: false });
 
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
});

// DELETE a todo
router.delete("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const deletedTodo = await collection.deleteOne({ _id });
    res.status(200).json(deletedTodo);
});

// PUT (Update) a todo status
router.put("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body; // 'status' here is already the new value (e.g., true)

    // Validate that status is a Boolean
    if (typeof status !== "boolean") {
        return res.status(400).json({ mssg: "invalid status" });
    }
 
    // CHANGE THIS: Simply set it to the value provided, don't flip it again (!)
    const updatedTodo = await collection.updateOne({ _id }, { $set: { status: status } });
    
    // Send back acknowledged: true so your frontend knows it worked
    res.status(200).json({ acknowledged: updatedTodo.acknowledged });
});

module.exports = router;