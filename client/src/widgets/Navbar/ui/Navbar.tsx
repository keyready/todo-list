import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { NavbarLink } from 'shared/UI/NavbarLink';
import { Button } from 'primereact/button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UserActions } from 'entities/User';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(UserActions.logout());
    }, [dispatch]);

    return (
        <HStack maxW justify="between" className={classNames(classes.Navbar, {}, [className])}>
            <HStack maxW>
                <NavbarLink to={RoutePath.main} text="Главная" />
                <NavbarLink to={RoutePath.todolist} text="Список тудушек" />
                <NavbarLink to={RoutePath.createtodo} text="Создать тудушку" />
            </HStack>

            <Button severity="danger" onClick={handleLogout}>
                Выйти
            </Button>
        </HStack>
    );
});
