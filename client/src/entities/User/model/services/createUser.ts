import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { User } from '../types/User';

export const createUser = createAsyncThunk<User, User, ThunkConfig<string>>(
    'User/createUser',
    async (newUser, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/create_user', newUser);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
