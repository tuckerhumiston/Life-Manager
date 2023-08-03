
const express = require("express");
const router = express.Router();
const pool = require('../../db');

// Create user
router.post("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;