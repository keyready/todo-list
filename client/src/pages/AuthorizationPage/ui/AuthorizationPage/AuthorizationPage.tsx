import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUserForm, RegisterUserForm } from 'entities/User';
import { TabPanel, TabView } from 'primereact/tabview';
import classes from './AuthorizationPage.module.scss';

interface AuthorizationPageProps {
    className?: string;
}

const AuthorizationPage = memo((props: AuthorizationPageProps) => {
    const { className } = props;

    useEffect(() => {
        document.title = 'Авторизуйся';
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const [redirectedFrom, setRedirectedFrom] = useState<string>('');

    useEffect(() => {
        if (location.state?.from) {
            setRedirectedFrom(location.state?.from.pathname);
        }
    }, [location]);

    const onSuccessfulAuth = useCallback(() => {
        navigate(redirectedFrom);
    }, [navigate, redirectedFrom]);

    return (
        <Page className={classNames(classes.AuthorizationPage, {}, [className])}>
            {redirectedFrom ? (
                <Text align="center" title="Прежде, чем посетить эту страницу, автризуйтесь" />
            ) : (
                <Text align="center" title="Авторизуйтесь" />
            )}

            <TabView className={classes.tabs}>
                <TabPanel header="Авторизация">
                    <LoginUserForm onLogin={onSuccessfulAuth} />
                </TabPanel>
                <TabPanel header="Регистрация">
                    <RegisterUserForm onRegister={onSuccessfulAuth} />
                </TabPanel>
            </TabView>
        </Page>
    );
});

export default AuthorizationPage;
