import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers: Headers) => {
            headers.set('Authorization', `Bearer ${localStorage.getItem('user')}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});
