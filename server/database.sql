CREATE DATABASE lifemanager;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE passwords(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    salt VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL
);

CREATE TABLE dashboards(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(100) NOT NULL
);

CREATE TABLE widgets(
    id SERIAL PRIMARY KEY,
    dashboard_id INTEGER REFERENCES dashboards(id),
    title VARCHAR(100) NOT NULL,
    type VARCHAR(255) NOT NULL,
    -- data JSONB NOT NULL,
    position_column INTEGER,
    position_row INTEGER,
    size_column INTEGER,
    size_row INTEGER
);



CREATE TABLE todo_lists(
    id SERIAL PRIMARY KEY,
    widget_id INTEGER REFERENCES widgets(id),
    title VARCHAR(100) NOT NULL
);

CREATE TABLE todo_item(
    id SERIAL PRIMARY KEY,
    todo_list_id INTEGER REFERENCES todo_lists(id),
    todo VARCHAR(256) NOT NULL,
    completed BOOLEAN NOT NULL
);
