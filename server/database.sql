CREATE DATABASE life_manager;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE passwords(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    salt VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL
);

CREATE TABLE todo_lists(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(100) NOT NULL
);

CREATE TABLE todo_items(
    id SERIAL PRIMARY KEY,
    todo_list_id INTEGER REFERENCES todo_lists(id),
    todo VARCHAR(256) NOT NULL,
    completed BOOLEAN NOT NULL
);
