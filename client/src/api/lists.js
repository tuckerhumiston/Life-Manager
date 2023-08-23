// Functions to fetch data from the backend

import axios from 'axios';
axios.defaults.withCredentials = true;


export async function fetchProtectedInfo() {
    return await axios.get(
        'http://localhost:5000/feature/lists',

    );
}

export async function postItem(itemData) {
    return await axios.post(
        'http://localhost:5000/feature/item',
        itemData
    );
}

export async function getItems(itemData) {
    return await axios.get('http://localhost:5000/feature/item', {
        params: itemData // Pass itemData as query parameters
    });
}

export async function updateItem(itemData) {
    return await axios.put(
        'http://localhost:5000/feature/item',
        itemData
    );
}

export async function deleteItem(itemData) {
    return await axios.delete(
        'http://localhost:5000/feature/item',
        { params: itemData }
    );
}