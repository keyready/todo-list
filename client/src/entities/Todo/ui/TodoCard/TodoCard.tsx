import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useEffect, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { HStack } from 'shared/UI/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { Input } from 'shared/UI/Input';
import { changeTodoTitle } from '../../model/services/changeTodoTitle';
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

    const [newTitle, setNewTitle] = useState<string>(todo.title);
    const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

    const resetNewTitleValue = useCallback(() => {
        setIsTitleEditing(false);
        setNewTitle(todo.title);
    }, [todo.title]);

    const handleEscClick = useCallback(
        (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                event.preventDefault();
                resetNewTitleValue();
            }
        },
        [resetNewTitleValue],
    );

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

    const handleTitleChangeClick = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await dispatch(
                changeTodoTitle({
                    todoId: todo.id,
                    newTitle,
                }),
            );
            setIsTitleEditing(false);
            updateTodosList();
        },
        [dispatch, newTitle, todo.id, updateTodosList],
    );

    useEffect(() => {
        document.addEventListener('keydown', handleEscClick);

        return () => document.removeEventListener('keydown', handleEscClick);
    }, [handleEscClick]);

    return (
        <HStack
            align="center"
            justify="between"
            maxW
            className={classNames(classes.TodoCard, {}, [className])}
        >
            {isTitleEditing ? (
                <form onSubmit={handleTitleChangeClick}>
                    <HStack justify="between" maxW>
                        <Input
                            className={classes.newTitleInput}
                            value={newTitle}
                            onChange={setNewTitle}
                        />
                        <HStack>
                            <Button severity="danger" type="button" onClick={resetNewTitleValue}>
                                Отмена
                            </Button>
                            <Button type="submit">Сохранить</Button>
                        </HStack>
                    </HStack>
                </form>
            ) : (
                <Text
                    className={classes.title}
                    onClick={todo.status !== 'completed' ? () => setIsTitleEditing(true) : () => {}}
                    title={todo.title}
                    titleClassname={todo.status === 'completed' ? classes.completed : ''}
                />
            )}

            {!isTitleEditing && (
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
            )}
        </HStack>
    );
});
