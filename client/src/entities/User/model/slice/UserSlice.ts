import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from '../services/loginUser';
import { UserSchema } from '../types/UserSchema';
import { createUser } from '../services/createUser';
import { User } from '../types/User';

const initialState: UserSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        resetErrors: (state) => {
            state.error = undefined;
        },
        logout: (state) => {
            localStorage.removeItem('user');
            state.data = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
