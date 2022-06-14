const fetch = require('node-fetch');
const users = require('./data_files/activitiesList.json');

const TOKEN = await fetch('http://localhost:3000/v1/user/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: 'seedin@seedin.com',
        password: 'seeding',
    }),
}).then((res) => res.json());

users.forEach(async (user) => {
    const response = await fetch('http://localhost:3000/v1/user/createNew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
});
