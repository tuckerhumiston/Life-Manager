const express = require("express");
const router = express.Router();
const pool = require('../db');

// Create todo_list
router.post("/", async (req, res) => {
    try {
        const { user_id, title } = req.body;
        //Create todo_list
        const newTodoList = await pool.query(
            "INSERT INTO todo_lists (user_id, title) VALUES($1, $2) RETURNING *",
            [user_id, title]
        );

        res.status(201).json(newTodoList);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while creating the todo_list" });
    }
});

// Get todo_list

// FIXME after adding user authentication
// Get all todo_lists belonging to the user
router.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        //Get all todo_lists
        const allTodoLists = await pool.query(
            "SELECT * FROM todo_lists WHERE user_id = $1",
            [user_id]
        );

        res.json(allTodoLists.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Update todo_list
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        //Update todo_list
        const updateTodoList = await pool.query(
            "UPDATE todo_lists SET title = $1 WHERE id = $2",
            [title, id]
        );

        res.json("Todo list was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete todo_list
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //Delete todo_list
        const deleteTodoList = await pool.query(
            "DELETE FROM todo_lists WHERE id = $1",
            [id]
        );

        res.json("Todo list was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});





module.exports = router;