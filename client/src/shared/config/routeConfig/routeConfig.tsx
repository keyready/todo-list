import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/common/NotFound';
import { TodoListPage } from 'pages/TodoListPage';
import { CreateTodoPage } from 'pages/CreateTodoPage';
import { AuthorizationPage } from 'pages/AuthorizationPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    TODOLIST = 'todolist',
    CREATETODO = 'createtodo',
    AUTHORIZATION = 'authorization',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TODOLIST]: '/todo-list',
    [AppRoutes.CREATETODO]: '/create-todo',
    [AppRoutes.AUTHORIZATION]: '/auth',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.AUTHORIZATION]: {
        path: RoutePath.authorization,
        element: <AuthorizationPage />,
    },

    [AppRoutes.TODOLIST]: {
        path: RoutePath.todolist,
        element: <TodoListPage />,
        authOnly: true,
    },
    [AppRoutes.CREATETODO]: {
        path: RoutePath.createtodo,
        element: <CreateTodoPage />,
        authOnly: true,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
