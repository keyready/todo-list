import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { User } from '../types/User';

interface LoginUserProps {
    username: string;
    password: string;
}

export const loginUser = createAsyncThunk<User, LoginUserProps, ThunkConfig<string>>(
    'User/loginUser',
    async (userData, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/login_user', userData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem('user', JSON.stringify(response.data));

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
