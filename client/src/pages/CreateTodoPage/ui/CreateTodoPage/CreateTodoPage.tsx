import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useEffect } from 'react';
import { Text } from 'shared/UI/Text';
import { CreateTodo } from 'entities/Todo';
import classes from './CreateTodoPage.module.scss';

interface CreateTodoPageProps {
    className?: string;
}

const CreateTodoPage = memo((props: CreateTodoPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Создание тудушки';
    }, []);

    return (
        <Page className={classNames(classes.CreateTodoPage, {}, [className])}>
            <Text title="Давай создадим тудушку!" size="large" />
            <CreateTodo />
        </Page>
    );
});

export default CreateTodoPage;
