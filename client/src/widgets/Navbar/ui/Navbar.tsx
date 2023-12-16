import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { NavbarLink } from 'shared/UI/NavbarLink';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => (
    <HStack maxW align="start" className={classNames(classes.Navbar, {}, [className])}>
        <NavbarLink to={RoutePath.main} text="Главная" />
        <NavbarLink to={RoutePath.todolist} text="Список тудушек" />
        <NavbarLink to={RoutePath.createtodo} text="Создать тудушку" />
    </HStack>
));
