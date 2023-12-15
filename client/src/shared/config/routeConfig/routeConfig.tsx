import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/common/NotFound';
import { TodoListPage } from 'pages/TodoListPage';
import { CreateTodoPage } from 'pages/CreateTodoPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    TODOLIST = 'todolist',
    CREATETODO = 'createtodo',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TODOLIST]: '/todo-list',
    [AppRoutes.CREATETODO]: '/create-todo',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.TODOLIST]: {
        path: RoutePath.todolist,
        element: <TodoListPage />,
    },
    [AppRoutes.CREATETODO]: {
        path: RoutePath.createtodo,
        element: <CreateTodoPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
