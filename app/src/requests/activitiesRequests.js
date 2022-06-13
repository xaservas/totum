import axios from 'axios';

export async function getActivities() {
    try {
        const response = await axios.get('https://api.totum.ovh/v1/activities')
        return response.data;
    }
    catch (error){
        console.error(error);
        throw error;
    }
}