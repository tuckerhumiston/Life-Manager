const db = require("../db");
const { validationResult } = require("express-validator");


//Create a new list item
exports.add_item = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Pull out request body
        const { title, list } = req.body;
        const { id } = req.user;
        const sanitizedTitle = encodeURIComponent(title);
        const sanatizedList = encodeURIComponent(list);

        // Database query
        const newItem = await db.query(
            `INSERT INTO ${sanatizedList} (user_id, description) VALUES($1, $2) RETURNING *`,
            [id, sanitizedTitle]
        );

        // Send response
        res.status(201).json({
            item: newItem.rows[0],
            success: true,
            item_id: newItem.rows[0].id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while creating the item" });
    }
}


//Get all of a user's list's items
exports.get_all_items = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Pull out request body
        const { id } = req.user;
        const { list } = req.query;
        const sanatizedList = encodeURIComponent(list);
        

        // Database query
        const allItems = await db.query(
            `SELECT * FROM ${sanatizedList} WHERE user_id = $1`,
            [id]
        );

        // Send response
        res.json({
            items: allItems.rows,
            success: true
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while fetching the items" });
    }
}


//Update a list item
exports.update_item = async (req, res) => {
    try {

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Pull out request body
        const { id, title, completed } = req.body;
        const user_id = req.user.id;
        const { list } = req.body;
        const sanitizedTitle = encodeURIComponent(title);
        const sanatizedList = encodeURIComponent(list);

        // Database query
        const updatedItem = await db.query(
            `UPDATE ${sanatizedList} SET description = $1, completed = $4 WHERE id = $2 AND user_id = $3 RETURNING *`,
            [sanitizedTitle, id, user_id, completed]
        );

        // Send response
        res.json({
            item: updatedItem.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while updating the item" });
    }
}


//Delete a list item
exports.delete_item = async (req, res) => {
    try {

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Pull out request body
        const { description, list } = req.query;
        const user_id = req.user.id;
        const sanatizedList = encodeURIComponent(list);

        // Delete todo_item
        const deletedItem = await db.query(
            `DELETE FROM ${sanatizedList} WHERE description = $1 AND user_id = $2 RETURNING *`,
            [description, user_id]
        );

        // Send response
        res.json({
            item: deletedItem.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while deleting the item" });
    }
}
