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
/*
export function saveAuthorization(token) {
    instance.defaults.headers.common.Authorization = `bearer ${token}`;
    console.log(`je suis dans saveAuthorization et j'ai bien le token: ${token}`)
}*/

console.log(localStorage.getItem('token'));
//console.log(instance.headers);

export default instance;