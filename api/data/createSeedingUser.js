const fetch = require('node-fetch');

const registerUser = {
    email: 'seedin@seedin.com',
    password: 'seeding',
    passwordConfirmation: 'seeding',
    firstname: 'seeding',
    lastname: 'seeding',
    about: 'seeding',
    address: 'seeding',
    zip_code: '75000',
    city: 'seeding',
    country: 'seeding',
    cookie: 'false',
    landmark: 'false',
};

const seedinUser = async () => {
    const response = await fetch('http://localhost:3000/v1/user/createNew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerUser),
    });
    const data = await response.json();
    return data;
};

console.log('seeding user done');
console.log(seedinUser());
