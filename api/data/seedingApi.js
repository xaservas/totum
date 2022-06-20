/* eslint-disable no-plusplus */
const fetch = require('node-fetch');
const users = require('./data_files/userList.json');
const categoryList = require('./data_files/categoryList.json');
const activitiesList = require('./data_files/activitiesList.json');

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdEB0ZXN0LmZyIiwiaWF0IjoxNjU1NTc3Njc0LCJleHAiOjE2NTU2NjQwNzR9.N_rNh2LFHYk1FV_Snm0RE5V4wCHWAdgby5b7M8sfZIc';

// users.forEach((user) => {
//   const query = {
//     email: user.email,
//     password: user.password,
//     passwordConfirmation: user.passwordConfirmation,
//     firstname: user.firstname,
//     lastname: user.lastname,
//     about: user.about,
//     address: user.address,
//     zip_code: user.zip_code,
//     city: user.city,
//     country: user.country,
//     cookie: user.cookie,
//     landmark: user.landmark,
//     coordinate: user.coordinate,
//   };
//   fetch('https://api.totum.ovh/v1/user/createNew', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${TOKEN}`,
//     },
//     body: JSON.stringify(query),
//   }).then((res) => res.json());
// });

// for (let i = 0; i < categoryList[1].Ludiques.length; i++) {
//   const query = {
//     name: Object.keys(categoryList[1].Ludiques[i])[0],
//     picto: Object.values(categoryList[1].Ludiques[i])[0],
//   };
//   fetch('https://api.totum.ovh/v1/category/createNew', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${TOKEN}`,
//     },
//     body: JSON.stringify(query),
//   }).then((res) => res.json());
// }

// for (let i = 0; i < categoryList[0].Sportives.length; i++) {
//   const query = {
//     name: Object.keys(categoryList[0].Sportives[i])[0],
//     picto: Object.values(categoryList[0].Sportives[i])[0],
//   };
//   fetch('https://api.totum.ovh/v1/category/createNew', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${TOKEN}`,
//     },
//     body: JSON.stringify(query),
//   }).then((res) => res.json());
// }

activitiesList.forEach((activity) => {
  const query = {
    name: activity.name,
    description: activity.description,
    max_participants: activity.max_participants,
    date: activity.date,
    level: activity.level,
    address: activity.address,
    zip_code: activity.zip_code,
    city: activity.city,
    country: activity.country,
    landmark: activity.landmark,
    id_user: activity.id_user,
    id_category: activity.id_category,
  };
  fetch('https://api.totum.ovh/v1/activity/createNew', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(query),
  }).then((res) => res.json());
});
