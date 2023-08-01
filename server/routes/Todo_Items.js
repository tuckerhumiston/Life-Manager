const express = require("express");
const router = express.Router();
const pool = require('../db');

// Create todo_item
router.post("/", async (req, res) => {
    try {
        const { todo_list_id, todo } = req.body;
        //Create todo_item
        const newTodoItem = await pool.query(
            "INSERT INTO todo_items (todo_list_id, todo, completed) VALUES($1, $2, $3) RETURNING *",
            [todo_list_id, todo, false]
        );
        res.status(201).json(newTodoItem);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while creating the todo_item" });
    }
});

// Get all todo_items
router.get("/:todo_list_id", async (req, res) => {
    try {
        const { todo_list_id } = req.params;
        //Get all todo_items
        const allTodoItems = await pool.query(
            "SELECT * FROM todo_items WHERE todo_list_id = $1",
            [todo_list_id]
        );

        res.json(allTodoItems.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update todo_item status
router.put("/:list_id/:id", async (req, res) => {
    try {
        const { list_id, id } = req.params;
        const { completed } = req.body;

        //Update todo_item
        const updateTodoItem = await pool.query(
            "UPDATE todo_items SET completed = $1 WHERE id = $2",
            [!completed, id]
        );

        res.json("Todo item was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete todo_item
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //Delete todo_item
        const deleteTodoItem = await pool.query(
            "DELETE FROM todo_items WHERE id = $1",
            [id]
        );

        res.json("Todo item was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});




module.exports = router;