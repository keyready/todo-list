import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoSchema } from '../types/TodoSchema';
import { createTodo } from '../services/createTodo';
import { deleteTodo } from '../services/deleteTodo';
import { completeTodo } from '../services/completeTodo';

const initialState: TodoSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const TodoSlice = createSlice({
    name: 'TodoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTodo.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteTodo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(completeTodo.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(completeTodo.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(completeTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: TodoActions } = TodoSlice;
export const { reducer: TodoReducer } = TodoSlice;
