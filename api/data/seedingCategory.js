const fetch = require('node-fetch');

const registerCategory = {
    picto: 'seeding',
};

const seedinCategory = async () => {
    const response = await fetch('http://localhost:3000/v1/category/createNew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerCategory),
    });
    const data = await response.json();
    return data;
};

console.log('seeding category done');
console.log(seedinCategory());
