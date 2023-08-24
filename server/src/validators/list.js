const { check } = require("express-validator");

const allowedTables = ['habits', 'goals', 'todo'];

const addItemValidation = [
    check("title")
        .isString()
        .trim()
        .escape(),
    check("list")
        .isIn(allowedTables),
];

const getAllItemsValidation = [
    check("list")
        .isIn(allowedTables),
];

const updateItemValidation = [
    check("id")
        .isInt(),
    check("title")
        .isString()
        .trim()
        .escape(),
    check("completed")
        .isBoolean(),
    check("list")
        .isIn(allowedTables),
];

const deleteItemValidation = [
    check("description")
        .isString()
        .trim()
        .escape(),
    check("list")
        .isIn(allowedTables),
];

module.exports = {
    addItemValidation,
    getAllItemsValidation,
    updateItemValidation,
    deleteItemValidation
}