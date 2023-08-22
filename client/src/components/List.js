import React, { useState } from 'react';

import '../style/features/List.css'

export const List = () => {

    const [todo, setTodo] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { 
                title: todo,
                todo_list_id: 1
             };
            const response = await fetch("http://localhost:5000/api/item", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            console.log(response)
        } catch (error) {
            console.error(error.message);
        }
    }
        
        return (
            <div className="list">
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <p>Test</p>
                <form className="add-item" onSubmit={onSubmitForm}>
                    <input 
                        type="text"
                        placeholder="Enter task here"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    ></input>
                    <button type="submit" >+</button>
                </form>
            </div>
        );
};