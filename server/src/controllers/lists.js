
const db = require("../db");

const allowedTables = ['habits', 'goals', 'todo'];


//Create a new list item
exports.add_item = async (req, res) => {
    try {
        const { title, list } = req.body;
        const { id } = req.user;
        
        // Validate that 'list' is one of the allowed tables
        if (!allowedTables.includes(list)) {
            return res.status(400).json({ error: "Invalid table name" });
        }

        // Create item
        const newItem = await db.query(
            `INSERT INTO ${list} (user_id, description) VALUES($1, $2) RETURNING *`,
            [id, title]
        );

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
        const { id } = req.user;
        const { list } = req.query;
        
        // Validate that 'list' is one of the allowed tables
        if (!allowedTables.includes(list)) {
            return res.status(400).json({ error: "Invalid table name" });
        }

        // Get all list items
        const allItems = await db.query(
            `SELECT * FROM ${list} WHERE user_id = $1`,
            [id]
        );

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
        const { id, title, completed } = req.body;
        const user_id = req.user.id;
        const { list } = req.body;

        // Validate that 'list' is one of the allowed tables
        if (!allowedTables.includes(list)) {
            return res.status(400).json({ error: "Invalid table name" });
        }

        // Update todo_item
        const updatedItem = await db.query(
            `UPDATE ${list} SET description = $1, completed = $4 WHERE id = $2 AND user_id = $3 RETURNING *`,
            [title, id, user_id, completed]
        );

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
        const { id } = req.body;
        const user_id = req.user.id;
        const { list } = req.body;

        // Validate that 'list' is one of the allowed tables
        if (!allowedTables.includes(list)) {
            return res.status(400).json({ error: "Invalid table name" });
        }

        // Delete todo_item
        const deletedItem = await db.query(
            `DELETE FROM ${list} WHERE id = $1 AND user_id = $2 RETURNING *`,
            [id, user_id]
        );

        res.json({
            item: deletedItem.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while deleting the item" });
    }
}
