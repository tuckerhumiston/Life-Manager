import axios from 'axios';
axios.defaults.withCredentials = true;

export async function fetchProtectedInfo() {
    return await axios.get(
        'http://localhost:5000/api/lists',
    );
}