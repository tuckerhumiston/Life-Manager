const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const e = require('express');

// Middleware
app.use(cors());
app.use(express.json());  // req.body

// Routes //

// Create user
app.post("/users", async (req, res) => {
    try {
        const { username, email } = req.body;
        //Create user
        const newUser = await pool.query(
            "INSERT INTO users (username, email) VALUES($1, $2) RETURNING *",
            [username, email]
        );

        res.json(newUser);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        //Delete user
        const deleteUser = await pool.query(
            "DELETE FROM users WHERE id = $1",
            [id]
        );
        
        

        res.json("User was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});


// Create user's password

// Change user's password

// Get user's password


// Create todo_list
app.post("/todo_lists", async (req, res) => {
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
app.get("/todo_lists/:user_id", async (req, res) => {
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

// Delete todo_list


// Create todo_item

// Get todo_item

// Get all todo_items

// Update todo_item

// Delete todo_item





app.listen(5000, () => {
    console.log('Server has started on port 5000');
});