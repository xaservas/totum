const fetch = require('node-fetch');

const registerActivities = {
    name: 'seeding',
    description: 'seeding',
    max_participants: 'seeding',
    date: 'seeding',
    level: 'seeding',
    adress: 'seeding',
    zip_code: 'seeding',
    city: '75000',
    country: 'seeding',
    landmark: 'seeding',
    id_user: '',
    landmark: '',
};

const seedinActivities = async () => {
    const response = await fetch('http://localhost:3000/v1/activity/createNew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerActivities),
    });
    const data = await response.json();
    return data;
};

console.log('seeding activities done');
console.log(seedinActivities());
