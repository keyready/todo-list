import { Page } from 'widgets/Page/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { Divider } from 'primereact/divider';
import { HStack, VStack } from 'shared/UI/Stack';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './MainPage.module.scss';

const MainPage = () => (
    <Page className={classNames(classes.MainPage, {}, [])}>
        <Text
            align="center"
            title="Привет, Рыжик!"
            size="large"
            text="Это простенький туду-лист, или как его называют, - список дел"
        />
        <VStack maxW className={classes.secondText}>
            <Text size="small" title="Запрос на получения всех тудушек летит на /get_todos. " />
            <Text
                text={
                    'Метод запроса - GET, в ответе жду массив вида ' +
                    "[{id: 1, title: 'Закрыть сессию', status: 'active'}, {id: 2, title: " +
                    "'Сделать домашку', status: 'completed'}, ...]"
                }
            />
        </VStack>
        <VStack maxW className={classes.secondText}>
            <Text size="small" title="Запрос на создании тудушки летит на /create_todo. " />
            <Text text="Метод запроса - POST, тело запроса - название тудушки" />
        </VStack>
        <VStack maxW>
            <Text size="small" title="Запрос на удаление тудушки летит на /delete_todo" />
            <Text text="Метод запроса - POST, тело запроса - id тудушки" />
        </VStack>
        <VStack maxW>
            <Text
                size="small"
                title="Запрос на отметить тудушку выполненной летит на /complete_todo"
            />
            <Text text="Метод запроса - POST, тело запроса - id тудушки" />
        </VStack>
        <HStack maxW>
            <Text size="small" title="Посмотреть все тудушки можно вот" />
            <AppLink to={RoutePath.todolist}>тут</AppLink>
            <Text size="small" title=", а создать новую вот" />
            <AppLink to={RoutePath.createtodo}>тут</AppLink>
        </HStack>
    </Page>
);

export default MainPage;
