import { rtkApi } from 'shared/api/rtkApi';
import { Todo } from '../model/types/Todo';

const fetchAllTodosApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query<Todo[], void>({
            query: (dir) => ({
                url: '/get_todos',
            }),
        }),
    }),
});

export const useTodos = fetchAllTodosApi.useGetTodosQuery;
