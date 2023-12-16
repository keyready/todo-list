import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { Text } from 'shared/UI/Text';
import { VStack } from 'shared/UI/Stack';
import { TodosList } from 'entities/Todo';
import { useTodos } from 'entities/Todo/api/fetchAllTodosApi';
import classes from './TodoListPage.module.scss';

interface TodoListPageProps {
    className?: string;
}

const TodoListPage = memo((props: TodoListPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Список тудушек';
    }, []);

    const {
        data: todos,
        isLoading: isTodosLoading,
        error: todosError,
        refetch,
    } = useTodos('', { refetchOnMountOrArgChange: true });

    return (
        <Page className={classNames(classes.TodoListPage, {}, [className])}>
            <VStack maxW gap="8" className={classes.title}>
                <Text size="large" title="Список всех тудушек" />
            </VStack>
            {isTodosLoading && <Text text="Загрузка..." />}
            {todos?.length ? <TodosList todos={todos} onTodosListChange={refetch} /> : ''}
            {!todos?.length && !isTodosLoading && !todosError ? (
                <Text variant="warning" title="Тудушек пока нет( Надо бы создать парочку" />
            ) : (
                ''
            )}
            {todosError && (
                <Text variant="error" title="Произошла ошибка во время загрузки данных" />
            )}
        </Page>
    );
});

export default TodoListPage;
