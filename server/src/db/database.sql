CREATE DATABASE life_manager;

-- Drop the existing tables
DROP TABLE IF EXISTS habits;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS todo;
DROP TABLE IF EXISTS users;

-- Create the tables with the correct ON DELETE CASCADE option
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT current_date,
    initialized BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    description VARCHAR(256) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    description VARCHAR(256) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    description VARCHAR(256) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);