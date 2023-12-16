import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createTodo } from 'entities/Todo/model/services/createTodo';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './CreateTodo.module.scss';

interface CreateTodoProps {
    className?: string;
}

export const CreateTodo = memo((props: CreateTodoProps) => {
    const { className } = props;

    const [title, setTitle] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const result = await dispatch(createTodo(title));
            if (result.meta.requestStatus === 'fulfilled') {
                setTitle('');
                navigate(RoutePath.todolist);
            }
        },
        [dispatch, navigate, title],
    );

    return (
        <form
            onSubmit={handleFormSubmit}
            className={classNames(classes.CreateTodo, {}, [className])}
        >
            <VStack gap="16">
                <Input
                    autoFocus
                    value={title}
                    onChange={setTitle}
                    placeholder="Введите название новой тудушки"
                />
                <Button type="submit" severity={title ? 'success' : 'danger'} disabled={!title}>
                    Создать!
                </Button>
            </VStack>
        </form>
    );
});
