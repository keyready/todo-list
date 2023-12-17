import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { NavbarLink } from 'shared/UI/NavbarLink';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserData, UserActions } from 'entities/User';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userData = useSelector(getUserData);

    const handleLogoutClick = useCallback(() => {
        dispatch(UserActions.logout());
    }, [dispatch]);

    const handleLoginClick = useCallback(() => {
        navigate(RoutePath.authorization);
    }, [navigate]);

    return (
        <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
            <HStack maxW>
                <NavbarLink to={RoutePath.main} text="Главная" />
                <NavbarLink to={RoutePath.todolist} text="Список тудушек" />
                <NavbarLink to={RoutePath.createtodo} text="Создать тудушку" />
            </HStack>

            {userData ? (
                <Button severity="danger" onClick={handleLogoutClick}>
                    Выйти
                </Button>
            ) : (
                <Button onClick={handleLoginClick}>Войти</Button>
            )}
        </HStack>
    );
});
