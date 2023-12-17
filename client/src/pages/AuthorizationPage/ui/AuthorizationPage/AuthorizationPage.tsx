import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { memo, useCallback, useEffect, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUserForm, RegisterUserForm, UserActions } from 'entities/User';
import { TabPanel, TabView } from 'primereact/tabview';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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
    const dispatch = useAppDispatch();

    const [redirectedFrom, setRedirectedFrom] = useState<string>('');
    const [currentTab, setCurrentTab] = useState<number>(0);

    useEffect(() => {
        if (location.state?.from) {
            setRedirectedFrom(location.state?.from.pathname);
        }
    }, [location]);

    const onSuccessfulAuth = useCallback(() => {
        navigate(redirectedFrom);
    }, [navigate, redirectedFrom]);

    const handleTabChange = useCallback(() => {
        dispatch(UserActions.resetErrors());
        setCurrentTab((prevState) => (prevState === 1 ? 0 : 1));
    }, [dispatch]);

    return (
        <Page className={classNames(classes.AuthorizationPage, {}, [className])}>
            {redirectedFrom ? (
                <Text align="center" title="Прежде, чем посетить эту страницу, авторизуйтесь" />
            ) : (
                <Text align="center" title="Авторизуйтесь" />
            )}

            <TabView
                className={classes.tabs}
                activeIndex={currentTab}
                onTabChange={handleTabChange}
            >
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
