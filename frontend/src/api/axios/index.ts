import axios from 'axios';
import { store } from '~/core/redux/store';
import { config } from '~/config';

const getAccessToken = () => store.getState().tokens.tokensData.accessToken;

const PRIVATE_API = axios.create({
    baseURL: config.BASE_URI,
});

PRIVATE_API.interceptors.request.use(
    config => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

PRIVATE_API.interceptors.response.use(
    response => response,
    error => {
        console.error('API request error:', error);
        return Promise.reject(error);
    }
);

export default PRIVATE_API;
