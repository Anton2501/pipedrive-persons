import axios from 'axios';

const params = {
    baseURL: 'https://aptechnologies.pipedrive.com/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        api_token: '72b5dd7937e0d09d03b60a6493cea92569c9647e'
    }
};

const API = axios.create(params);

export default API;