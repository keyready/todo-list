import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Text } from 'shared/UI/Text';
import { HStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { getTodoIsLoading } from '../../model/selectors/TodoSelectors';
import { completeTodo } from '../../model/services/completeTodo';
import { deleteTodo } from '../../model/services/deleteTodo';
import { Todo } from '../../model/types/Todo';
import classes from './TodoCard.module.scss';

interface TodoCardProps {
    className?: string;
    todo: Todo;
    onTodosListChange: () => void;
}

export const TodoCard = memo((props: TodoCardProps) => {
    const { className, todo, onTodosListChange } = props;

    const dispatch = useAppDispatch();
    const isTodoUpdating = useSelector(getTodoIsLoading);

    const updateTodosList = useCallback(() => {
        onTodosListChange();
    }, [onTodosListChange]);

    const handleCompleteTodoClick = useCallback(async () => {
        await dispatch(completeTodo(todo.id));
        updateTodosList();
    }, [dispatch, todo.id, updateTodosList]);

    const handleTodoDelete = useCallback(async () => {
        await dispatch(deleteTodo(todo.id));
        updateTodosList();
    }, [dispatch, todo.id, updateTodosList]);

    return (
        <HStack
            align="center"
            justify="between"
            maxW
            className={classNames(classes.TodoCard, {}, [className])}
        >
            <Text
                title={todo.title}
                titleClassname={todo.status === 'completed' ? classes.completed : ''}
            />
            <HStack>
                <Button
                    disabled={isTodoUpdating}
                    loading={isTodoUpdating}
                    severity="danger"
                    onClick={handleTodoDelete}
                >
                    Удалить
                </Button>
                {todo.status === 'active' && (
                    <Button
                        disabled={isTodoUpdating}
                        loading={isTodoUpdating}
                        severity="success"
                        onClick={handleCompleteTodoClick}
                    >
                        Отметить выполненным
                    </Button>
                )}
            </HStack>
        </HStack>
    );
});
