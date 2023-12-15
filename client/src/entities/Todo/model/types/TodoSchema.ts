import { Todo } from './Todo';

export interface TodoSchema {
    data?: Todo;
    isLoading: boolean;
    error?: string;
}
