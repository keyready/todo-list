import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';

interface ChangeTodoTitleProps {
    todoId: number;
    newTitle: string;
}

export const changeTodoTitle = createAsyncThunk<string, ChangeTodoTitleProps, ThunkConfig<string>>(
    'Todo/changeTodoTitle',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/change_todo_title', props);

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
