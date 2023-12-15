import { StateSchema } from 'app/providers/StoreProvider';

export const getTodoData = (state: StateSchema) => state.todo?.data;
export const getTodoIsLoading = (state: StateSchema) => state.todo?.isLoading;
export const getTodoError = (state: StateSchema) => state.todo?.error;
