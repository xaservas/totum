import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.totum.ovh/v1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')

    }
});

console.log(localStorage.getItem('token'));

        

export default instance;