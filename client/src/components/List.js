import React, { useState, useEffect } from 'react';
import { postItem, getItems } from '../api/lists';

import '../style/features/List.css';

export const List = (props) => {

    const [newItem, setNewItem] = useState("");
    const [items, setItems] = useState([]);

    const loadItems = async () => {
        try {
            const response = await getItems({ list: props.listType }); // Pass listType as query parameter
    
            setItems(response.data.items);
        } catch (error) {
            console.error("Error loading items:", error);
        }
    };
    

    useEffect(() => {
        loadItems();
    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const body = { 
            title: newItem,
            list: props.listType
        };
        await postItem(body);
        await loadItems(); // Fetch items again after adding a new item
    };

    return (
        <div className="list">
            {items.map(item => (
                <p key={item.id}>{item.description}</p>
            ))}

            <form className="add-item" onSubmit={onSubmitForm}>
                <input 
                    type="text"
                    placeholder="Enter task here"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                ></input>
                <button type="submit" >+</button>
            </form>
        </div>
    );
};
