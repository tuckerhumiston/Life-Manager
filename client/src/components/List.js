import React, { useState, useEffect } from 'react';
import { postItem, getItems, updateItem, deleteItem } from '../api/lists';

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

    const onAddItem = async (e) => {
        e.preventDefault();

        const body = { 
            title: newItem,
            list: props.listType
        };
        await postItem(body);
        await loadItems(); // Fetch items again after adding a new item
        setNewItem("");
    };

    const onRemoveItem = async (e) => {
        //Code to Strike through item or remove strike through
        if (e.target.style.textDecoration === 'line-through') {
            e.target.style.textDecoration = 'none';
        } else {
            e.target.style.textDecoration = 'line-through';
        }

        //wait for 2 seconds
        setTimeout(async () => {
            await deleteItem({ 
                list: props.listType,
                description: e.target.innerText
            });
            await loadItems();
        }, 2000);

        


    };

    return (
        <div className="list">
            {items.map(item => (
                <button className='list-instance' onClick={onRemoveItem} id={item.id}>
                    <p key={item.id}>{item.description}</p>
                </button>
            ))}

            <form className="add-item" onSubmit={onAddItem}>
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
