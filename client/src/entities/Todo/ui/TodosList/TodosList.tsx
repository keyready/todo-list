import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import { TodoCard } from '../TodoCard/TodoCard';
import { Todo } from '../../model/types/Todo';
import classes from './TodosList.module.scss';

interface TodosListProps {
    className?: string;
    todos: Todo[];
    onTodosListChange: () => void;
}

export const TodosList = memo((props: TodosListProps) => {
    const { className, todos, onTodosListChange } = props;

    return (
        <VStack gap="16" maxW className={classNames(classes.TodosList, {}, [className])}>
            {todos.map((todo) => (
                <TodoCard onTodosListChange={onTodosListChange} key={todo.id} todo={todo} />
            ))}
        </VStack>
    );
});
