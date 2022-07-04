import axios from 'axios';

// export default function API() {
//     const params = {
//         baseURL: 'https://aptechnologies.pipedrive.com/v1',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         params: {
//             api_token: '657c1644eb61c4b3980905263ccf3d496d897bfc'
//         }
//     };
//     return axios.create(params);
// }

const params = {
    baseURL: 'https://aptechnologies.pipedrive.com/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        api_token: '657c1644eb61c4b3980905263ccf3d496d897bfc'
    }
};

const API = axios.create(params);

export default API;