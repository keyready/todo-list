import axios from 'axios';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => config);
