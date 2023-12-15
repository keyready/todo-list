import { classNames } from 'shared/lib/classNames/classNames';
import { FormEvent, memo, useCallback, useState } from 'react';
import { VStack } from 'shared/UI/Stack';
import { Input } from 'shared/UI/Input';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { createTodo } from 'entities/Todo/model/services/createTodo';
import classes from './CreateTodo.module.scss';

interface CreateTodoProps {
    className?: string;
}

export const CreateTodo = memo((props: CreateTodoProps) => {
    const { className } = props;

    const [title, setTitle] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleFormSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await dispatch(createTodo(title));
            setTitle('');
        },
        [dispatch, title],
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
                    placeholder="Введите название новой задачи"
                />
                <Button type="submit" severity={title ? 'success' : 'danger'} disabled={!title}>
                    Создать!
                </Button>
            </VStack>
        </form>
    );
});
