
const db = require("../db");

//Create a new todo list
exports.add_list = async (req, res) => {
    try {
        const { title } = req.body;
        const { id } = req.user;
        //Create todo_list
        const newTodoList = await db.query(
            "INSERT INTO todo_lists (user_id, title) VALUES($1, $2) RETURNING *",
            [id, title]
        );

        res.status(201).json({
            success: true,
            message: "Todo list created successfully",
            list_id : newTodoList.rows[0].id
        });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while creating the todo_list" });
    }
}

//Get all todo lists belonging to the user
exports.get_lists = async (req, res) => {
    try {
        const { id } = req.user;
        //Get all todo_lists
        const allTodoLists = await db.query(
            "SELECT * FROM todo_lists WHERE user_id = $1",
            [id]
        );

        res.json({
            lists: allTodoLists.rows,
            success: true
        });
    } catch (err) {
        console.error(err.message);
    }
}

//Get a todo list
exports.get_list = async (req, res) => {
    try {
        const { id } = req.body;
        const user_id = req.user.id;
        //Get todo_list
        const todoList = await db.query(
            "SELECT * FROM todo_lists WHERE id = $1 AND user_id = $2",
            [id, user_id]
        );

        res.json({
            list: todoList.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
    }
}

//Update a todo list name
exports.update_list = async (req, res) => {
    try {
        const { id } = req.body;
        const { title } = req.body;
        const user_id = req.user.id;
        //Update todo_list
        const updatedTodoList = await db.query(
            "UPDATE todo_lists SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
            [title, id, user_id]
        );

        res.json({
            list: updatedTodoList.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
    }
}

//Delete a todo list
exports.delete_list = async (req, res) => {
    try {
        const { id } = req.body;
        const user_id = req.user.id;
        //Delete todo_list
        const deletedTodoList = await db.query(
            "DELETE FROM todo_lists WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, user_id]
        );

        res.json({
            list: deletedTodoList.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
    }
}



//Create a new todo item
exports.add_item = async (req, res) => {
    try {
        const { title } = req.body;
        const { todo_list_id } = req.body;
        const { id } = req.user;
        //Create todo_item
        const newTodoItem = await db.query(
            "INSERT INTO todo_items (USER_id, todo_list_id, todo) VALUES($1, $2, $3) RETURNING *",
            [id, todo_list_id, title]
        );

        res.status(201).json({
            item: newTodoItem,
            success: true,
            item_id: newTodoItem.rows[0].id
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "An error occurred while creating the todo_item" });
    }
}

//Get all of a user's todo items
exports.get_all_items = async (req, res) => {
    try {
        const { id } = req.user;
        //Get all todo_items
        const allTodoItems = await db.query(
            "SELECT * FROM todo_items WHERE user_id = $1",
            [id]
        );

        res.json({
            item: allTodoItems.rows,
            success: true});
    } catch (err) {
        console.error(err.message);
    }
}

//Get all the todo items for a specific todo list
exports.get_list_items = async (req, res) => {
    try {
        const { id } = req.body;
        const user_id = req.user.id;
        //Get todo_items
        const todoItems = await db.query(
            "SELECT * FROM todo_items WHERE todo_list_id = $1 AND user_id = $2",
            [id, user_id]
        );

        res.json({
            list: todoItems.rows,
             success: true
        });

    } catch (err) {
        console.error(err.message);
    }
}

//Update a todo item
exports.update_item = async (req, res) => {
    try {
        const { id, title, completed } = req.body;
        const user_id = req.user.id;
        //Update todo_item
        const updatedTodoItem = await db.query(
            "UPDATE todo_items SET todo = $1, completed = $4 WHERE id = $2 AND user_id = $3 RETURNING *",
            [title, id, user_id, completed]
        );

        res.json({
            item: updatedTodoItem.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
    }
}

//Delete a todo item
exports.delete_item = async (req, res) => {
    try {
        const { id } = req.body;
        const user_id = req.user.id;
        //Delete todo_item
        const deletedTodoItem = await db.query(
            "DELETE FROM todo_items WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, user_id]
        );

        res.json({
            item: deletedTodoItem.rows[0],
            success: true
        });
    } catch (err) {
        console.error(err.message);
    }
}