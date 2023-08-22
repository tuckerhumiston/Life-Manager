import axios from 'axios';
axios.defaults.withCredentials = true;

export async function onRegistration(registirationData) {
    return await axios.post(
        'http://localhost:5000/profile/register',
         registirationData
    );
}

export async function onLogin(loginData) {
    return await axios.post(
        'http://localhost:5000/profile/login',
        loginData
    );
}

export async function onLogout() {
    return await axios.get(
        'http://localhost:5000/profile/logout',
    );
}

