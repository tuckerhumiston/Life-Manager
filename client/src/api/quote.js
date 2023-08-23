import axios from 'axios';
axios.defaults.withCredentials = true;


export async function fetchQuote() {
    return await axios.get(
        'http://localhost:5000/quote/new',
    );
}